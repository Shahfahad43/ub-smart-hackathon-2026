import { useEffect, useRef, useState } from 'react';
import {
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Radio,
  Users,
  Clock,
  ListChecks,
  FileText,
  HelpCircle,
  Layers,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { LECTURE_INFO, MOCK_RESPONSES, QUIZ, FLASHCARDS, BLACKBOARD_URL } from '../lib/blackboardData';
import lectureVideo from '../assets/lecture-demo.mp4';

const LOOP_DURATION_MS = 2 * 60 * 1000; // simulate a ~2-minute live lecture by looping the short clip

// Duplicated from AIAssistant.jsx on purpose (not imported) — keeps this
// prototype fully self-contained so it can never affect the real UB Guide
// page by sharing a module with it.
const markdownComponents = {
  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-bold text-ink-900">{children}</strong>,
  h1: ({ children }) => <h3 className="text-base font-bold text-ink-900 mt-4 mb-2 first:mt-0">{children}</h3>,
  h2: ({ children }) => <h3 className="text-base font-bold text-ink-900 mt-4 mb-2 first:mt-0">{children}</h3>,
  h3: ({ children }) => <h4 className="text-sm font-bold text-ink-900 mt-3 mb-1.5 first:mt-0">{children}</h4>,
  ul: ({ children }) => <ul className="list-disc ps-5 space-y-1 mb-3">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal ps-5 space-y-1 mb-3">{children}</ol>,
  li: ({ children }) => <li className="text-sm text-ink-800 leading-relaxed">{children}</li>,
  blockquote: ({ children }) => <blockquote className="border-s-4 border-teal-500 ps-3.5 bg-teal-100/40 py-2 rounded-e-md text-sm text-ink-800 mb-3">{children}</blockquote>,
};

const STRINGS = {
  kicker: { en: 'Blackboard AI Learning Companion', ar: 'رفيق Blackboard الذكي للتعلّم' },
  live: { en: 'LIVE', ar: 'مباشر' },
  instructor: { en: 'Instructor', ar: 'المحاضر' },
  online: { en: 'Students Online', ar: 'طلاب متصلون' },
  openBlackboard: { en: 'Open in Blackboard', ar: 'فتح في Blackboard' },
  howCanIHelp: { en: 'How can UB Guide help with this lecture?', ar: 'كيف يمكن لـ UB Guide مساعدتك في هذه المحاضرة؟' },
  demoNote: {
    en: 'Prototype demo — video loops to simulate a live lecture, and AI responses below are pre-written for this demonstration.',
    ar: 'عرض تجريبي — يُعاد تشغيل الفيديو لمحاكاة محاضرة مباشرة، والإجابات أدناه معدّة مسبقًا لأغراض هذا العرض.',
  },
  analyzing: { en: 'UB Guide is analyzing the lecture…', ar: 'UB Guide يحلّل المحاضرة…' },
  quizTitle: { en: 'AI Practice Quiz', ar: 'اختبار قصير تفاعلي' },
  correct: { en: 'Correct!', ar: 'إجابة صحيحة!' },
  incorrect: { en: 'Not quite.', ar: 'ليست صحيحة.' },
  flashcardsTitle: { en: 'AI Flashcards', ar: 'بطاقات تعليمية' },
  clickToReveal: { en: 'Click to reveal', ar: 'اضغط للكشف' },
  clickToFlipBack: { en: 'Click to flip back', ar: 'اضغط للعودة' },
  ended: { en: 'Lecture recording ended', ar: 'انتهى تسجيل المحاضرة' },
  replay: { en: 'Replay', ar: 'إعادة تشغيل' },
};

const ACTIONS = [
  { id: 'whatMissed', icon: Clock, label: { en: 'What did I miss?', ar: 'ماذا فاتني؟' } },
  { id: 'summarize', icon: ListChecks, label: { en: 'Summarize the lecture', ar: 'تلخيص المحاضرة' } },
  { id: 'notes', icon: FileText, label: { en: 'Generate Notes', ar: 'إنشاء ملاحظات' } },
  { id: 'quiz', icon: HelpCircle, label: { en: 'Generate Quiz', ar: 'إنشاء اختبار' } },
  { id: 'flashcards', icon: Layers, label: { en: 'Generate Flashcards', ar: 'إنشاء بطاقات' } },
];

// ---------------------------------------------------------------------------
// Custom video player: autoplay muted (browser-safe), custom controls, loops
// the short clip to simulate a ~2-minute live lecture, then stops.
// ---------------------------------------------------------------------------
function LiveVideoPlayer({ L }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [sessionEnded, setSessionEnded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSessionEnded(true);
      videoRef.current?.pause();
    }, LOOP_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleEnded = () => {
    if (sessionEnded) return;
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play();
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleVolume = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val > 0 && videoRef.current.muted) {
        videoRef.current.muted = false;
        setMuted(false);
      }
    }
  };

  const goFullscreen = () => {
    containerRef.current?.requestFullscreen?.();
  };

  const replay = () => {
    setSessionEnded(false);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play();
      setPlaying(true);
    }
    setTimeout(() => {
      setSessionEnded(true);
      videoRef.current?.pause();
    }, LOOP_DURATION_MS);
  };

  return (
    <div ref={containerRef} className="relative rounded-lg overflow-hidden bg-navy-950" style={{ aspectRatio: '16 / 9' }}>
      <video
        ref={videoRef}
        src={lectureVideo}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="w-full h-full object-cover"
      />

      {!sessionEnded && (
        <span className="absolute top-3 ltr:left-3 rtl:right-3 inline-flex items-center gap-1.5 bg-danger text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
          <Radio size={12} className="animate-pulse" /> {L(STRINGS.live)}
        </span>
      )}

      {sessionEnded && (
        <div className="absolute inset-0 bg-navy-950/85 flex flex-col items-center justify-center gap-3">
          <p className="text-white text-sm font-semibold">{L(STRINGS.ended)}</p>
          <Button variant="accent" size="sm" onClick={replay}>
            <RotateCcw size={14} />
            {L(STRINGS.replay)}
          </Button>
        </div>
      )}

      {!sessionEnded && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-950/90 to-transparent px-3 sm:px-4 pt-8 pb-3 flex items-center gap-3">
          <button onClick={togglePlay} className="text-white hover:text-teal-400 transition-colors shrink-0" aria-label="play-pause">
            {playing ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button onClick={toggleMute} className="text-white hover:text-teal-400 transition-colors shrink-0" aria-label="mute">
            {muted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={muted ? 0 : volume}
            onChange={handleVolume}
            className="w-20 accent-teal-500 shrink-0"
            aria-label="volume"
          />
          <span className="flex-1" />
          <button onClick={goFullscreen} className="text-white hover:text-teal-400 transition-colors shrink-0" aria-label="fullscreen">
            <Maximize size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Interactive quiz — all answers/explanations are hard-coded in blackboardData.js
// ---------------------------------------------------------------------------
function QuizBlock({ L }) {
  const [answers, setAnswers] = useState({});

  const select = (qIdx, optIdx) => {
    if (answers[qIdx] !== undefined) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  return (
    <div className="space-y-5">
      {QUIZ.map((q, qIdx) => {
        const picked = answers[qIdx];
        const answered = picked !== undefined;
        return (
          <div key={qIdx} className={qIdx > 0 ? 'pt-5 border-t border-line-soft' : ''}>
            <p className="text-sm font-bold text-ink-900 mb-2.5">
              {qIdx + 1}. {L(q.question)}
            </p>
            <div className="space-y-1.5">
              {q.options.map((opt, optIdx) => {
                const isCorrect = optIdx === q.correct;
                const isPicked = optIdx === picked;
                let cls = 'border-line hover:border-navy-500 hover:bg-sand-100';
                if (answered && isCorrect) cls = 'border-success bg-success-bg';
                else if (answered && isPicked && !isCorrect) cls = 'border-danger bg-danger-bg';
                return (
                  <button
                    key={optIdx}
                    onClick={() => select(qIdx, optIdx)}
                    disabled={answered}
                    className={`w-full text-start text-sm px-3.5 py-2.5 rounded-md border transition-colors ${cls} disabled:cursor-default`}
                  >
                    {L(opt)}
                  </button>
                );
              })}
            </div>
            {answered && (
              <p className={`text-xs font-semibold mt-2 ${picked === q.correct ? 'text-success' : 'text-danger'}`}>
                {picked === q.correct ? L(STRINGS.correct) : L(STRINGS.incorrect)} — {L(q.explanation)}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Interactive flashcards — click to flip
// ---------------------------------------------------------------------------
function FlashcardsBlock({ L }) {
  const [flipped, setFlipped] = useState({});
  const toggle = (i) => setFlipped((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="grid sm:grid-cols-2 gap-3.5">
      {FLASHCARDS.map((card, i) => (
        <button
          key={i}
          onClick={() => toggle(i)}
          className={`text-start p-4 rounded-lg border h-32 flex flex-col justify-between transition-colors ${
            flipped[i] ? 'bg-navy-900 border-navy-900' : 'bg-white border-line hover:border-navy-500'
          }`}
        >
          {!flipped[i] ? (
            <>
              <p className="text-sm font-bold text-ink-900">{L(card.term)}</p>
              <p className="text-[11px] text-ink-300">{L(STRINGS.clickToReveal)}</p>
            </>
          ) : (
            <>
              <p className="text-sm text-white leading-relaxed">{L(card.definition)}</p>
              <p className="text-[11px] text-teal-400">{L(STRINGS.clickToFlipBack)}</p>
            </>
          )}
        </button>
      ))}
    </div>
  );
}

export default function Blackboard() {
  const { L } = useLanguage();
  const [activeAction, setActiveAction] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState(null); // { kind: 'text'|'quiz'|'flashcards', text? }

  // Everything here is local — no fetch, no API, just a simulated delay so
  // the interaction still feels like the real product.
  const runAction = (actionId) => {
    if (thinking) return;
    setActiveAction(actionId);
    setThinking(true);
    setResult(null);
    const delay = 500 + Math.random() * 500; // 500-1000ms
    setTimeout(() => {
      if (actionId === 'quiz') setResult({ kind: 'quiz' });
      else if (actionId === 'flashcards') setResult({ kind: 'flashcards' });
      else setResult({ kind: 'text', text: L(MOCK_RESPONSES[actionId]) });
      setThinking(false);
    }, delay);
  };

  return (
    <div>
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wide text-teal-600 mb-1">{L(STRINGS.kicker)}</p>
        <h1 className="text-2xl sm:text-3xl text-ink-900">{L(LECTURE_INFO.lecture)}</h1>
        <p className="text-sm text-ink-500 mt-1">
          {L(LECTURE_INFO.course)} ({LECTURE_INFO.courseCode}) · {L(STRINGS.instructor)}: {L(LECTURE_INFO.instructor)}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 bg-danger-bg text-danger text-xs font-bold px-2.5 py-1 rounded-full">
                  <Radio size={12} className="animate-pulse" /> {L(STRINGS.live)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                  <Users size={13} /> {LECTURE_INFO.studentsOnline} {L(STRINGS.online)}
                </span>
              </div>
              <Button as="a" href={BLACKBOARD_URL} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">
                <ExternalLink size={14} />
                {L(STRINGS.openBlackboard)}
              </Button>
            </div>
            <LiveVideoPlayer L={L} />
          </Card>
          <p className="text-[11px] text-ink-300 italic px-1">{L(STRINGS.demoNote)}</p>
        </div>

        {/* AI companion panel */}
        <Card className="p-5 lg:col-span-1 h-fit">
          <div className="flex items-center gap-2.5 mb-4">
            <Sparkles size={18} className="text-teal-600" />
            <h3 className="text-sm font-bold text-ink-900">{L(STRINGS.howCanIHelp)}</h3>
          </div>
          <div className="space-y-2">
            {ACTIONS.map((a) => (
              <button
                key={a.id}
                onClick={() => runAction(a.id)}
                disabled={thinking}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md border text-start transition-colors disabled:opacity-50 ${
                  activeAction === a.id ? 'border-navy-500 bg-navy-700/5' : 'border-line hover:border-navy-500 hover:bg-sand-100'
                }`}
              >
                <a.icon size={16} className="text-navy-700 shrink-0" />
                <span className="text-sm font-semibold text-ink-900">{L(a.label)}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Result area */}
      <div className="mt-5">
        {thinking && (
          <Card className="p-6 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" />
            </div>
            <p className="text-xs text-ink-300">{L(STRINGS.analyzing)}</p>
          </Card>
        )}

        {!thinking && result?.kind === 'text' && (
          <Card className="p-6 animate-fade-in-up max-w-3xl">
            <div className="text-sm text-ink-800 leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {result.text}
              </ReactMarkdown>
            </div>
          </Card>
        )}

        {!thinking && result?.kind === 'quiz' && (
          <Card className="p-6 animate-fade-in-up max-w-3xl">
            <h3 className="text-sm font-bold text-ink-900 mb-4">{L(STRINGS.quizTitle)}</h3>
            <QuizBlock L={L} />
          </Card>
        )}

        {!thinking && result?.kind === 'flashcards' && (
          <Card className="p-6 animate-fade-in-up max-w-3xl">
            <h3 className="text-sm font-bold text-ink-900 mb-4">{L(STRINGS.flashcardsTitle)}</h3>
            <FlashcardsBlock L={L} />
          </Card>
        )}
      </div>
    </div>
  );
}
