import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles, CheckCircle2, FileText, ListChecks, ScrollText, HelpCircle, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { detectIntent, AI_RESPONSES } from '../lib/aiEngine';
import { askUBGuide } from '../lib/ubGuideApi';
import { REGULATIONS } from '../data/regulations';
import { ASSISTANT_NAME, ASSISTANT_AVATAR } from '../lib/assistant';

// Renders Claude's reply Markdown using the same type scale, colors, and
// spacing already used elsewhere on this page (text-sm/ink-800/leading-relaxed,
// teal links, navy emphasis) — no new visual language introduced, just
// mapping Markdown elements onto existing Tailwind classes.
const markdownComponents = {
  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-bold text-ink-900">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  h1: ({ children }) => <h3 className="text-base font-bold text-ink-900 mt-4 mb-2 first:mt-0">{children}</h3>,
  h2: ({ children }) => <h3 className="text-base font-bold text-ink-900 mt-4 mb-2 first:mt-0">{children}</h3>,
  h3: ({ children }) => <h4 className="text-sm font-bold text-ink-900 mt-3 mb-1.5 first:mt-0">{children}</h4>,
  ul: ({ children }) => <ul className="list-disc ps-5 space-y-1 mb-3">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal ps-5 space-y-1 mb-3">{children}</ol>,
  li: ({ children }) => <li className="text-sm text-ink-800 leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-teal-600 font-semibold underline underline-offset-2 hover:text-teal-700"
    >
      {children}
    </a>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = /language-/.test(className || '');
    if (isBlock) {
      return (
        <code className={`font-mono text-xs ${className || ''}`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="bg-sand-100 text-navy-800 rounded px-1.5 py-0.5 text-xs font-mono" {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-navy-950 text-sand-50 rounded-md p-3.5 overflow-x-auto text-xs font-mono mb-3">{children}</pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-s-4 border-line ps-3.5 italic text-ink-700 mb-3">{children}</blockquote>
  ),
  hr: () => <hr className="border-line-soft my-4" />,
};

// Small bilingual strings local to this page — kept here rather than in the
// global i18n dictionary since they only apply to this one feature.
const STRINGS = {
  thinking: { en: 'UB Guide is thinking…', ar: 'UB Guide يفكّر…' },
  poweredBy: { en: 'Powered by Claude · grounded in ub.edu.sa', ar: 'مدعوم بواسطة Claude · بالاستناد إلى ub.edu.sa' },
  offlineBadge: { en: 'Offline quick-answer (AI service unavailable)', ar: 'إجابة سريعة دون اتصال (خدمة الذكاء الاصطناعي غير متاحة)' },
  fallbackHint: { en: 'Showing an offline quick answer instead.', ar: 'يتم عرض إجابة سريعة دون اتصال بدلاً من ذلك.' },
};

const SUGGESTIONS = [
  { en: 'I failed a course', ar: 'رسبت في أحد المقررات' },
  { en: 'How can I improve my CGPA?', ar: 'كيف يمكنني تحسين معدلي التراكمي؟' },
  { en: 'Suggest courses or workshops for me', ar: 'اقترح لي مقررات أو ورش عمل' },
  { en: 'I want to retake a course', ar: 'أريد إعادة مقرر دراسي' },
  { en: 'I want to drop a course', ar: 'أريد حذف مقرر دراسي' },
  { en: 'When does registration open?', ar: 'متى يبدأ التسجيل؟' },
  { en: 'How do I apply for graduation?', ar: 'كيف أتقدم بطلب التخرج؟' },
  { en: 'Tell me about UB Bisha colleges', ar: 'حدثني عن كليات جامعة بيشة' },
  { en: 'When is my monthly allowance paid?', ar: 'متى تُصرف المكافأة الشهرية؟' },
  { en: "My university account isn't working", ar: 'حسابي الجامعي لا يعمل' },
  { en: 'I need an enrollment letter', ar: 'أحتاج إلى خطاب تعريف بالقيد' },
];

export default function AIAssistant() {
  const { t, L, lang } = useLanguage();
  const { student } = useAuth();
  const { showToast } = useAppState();
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [history, setHistory] = useState([]); // [{role:'user'|'assistant', text}]

  const [aiResult, setAiResult] = useState(null); // { reply, serviceId }
  const [offlineResult, setOfflineResult] = useState(null); // AI_RESPONSES entry (local fallback)
  const [notUnderstood, setNotUnderstood] = useState(false);
  const [refusalNote, setRefusalNote] = useState(null); // Claude's own one-line redirect, if any
  const [errorBanner, setErrorBanner] = useState(null);

  const openRegulation = (id) => {
    const reg = REGULATIONS.find((r) => r.id === id);
    if (!reg) return;
    showToast(`${L(reg.title)}: ${L(reg.summary)}`, 'ScrollText');
  };

  const clearResults = () => {
    setAiResult(null);
    setOfflineResult(null);
    setNotUnderstood(false);
    setRefusalNote(null);
    setErrorBanner(null);
  };

  const submit = async (text) => {
    const value = (text ?? input).trim();
    if (!value || thinking) return;
    setInput(value);
    setThinking(true);
    clearResults();

    try {
      const data = await askUBGuide({ message: value, student, uiLanguage: lang, history });

      setHistory((prev) =>
        [...prev, { role: 'user', text: value }, { role: 'assistant', text: data.reply }].slice(-8)
      );

      if (data.refused) {
        setNotUnderstood(true);
        setRefusalNote(data.reply || null);
      } else {
        setAiResult({ reply: data.reply, serviceId: data.serviceId });
      }
    } catch (err) {
      // Claude API unreachable (no key set yet, offline, rate-limited...)
      // — fall back to the local rule-based engine so the demo keeps working,
      // and say so plainly rather than failing silently.
      setErrorBanner(err.message || 'The AI service is unavailable right now.');
      const detected = detectIntent(value);
      if (detected) {
        setOfflineResult(AI_RESPONSES[detected.serviceId]);
      } else {
        setNotUnderstood(true);
      }
    } finally {
      setThinking(false);
      setInput('');
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3.5">
        <img src={ASSISTANT_AVATAR} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-500/50 shrink-0" />
        <div>
          <h1 className="text-2xl sm:text-3xl text-ink-900">{L(ASSISTANT_NAME)}</h1>
          <p className="text-sm text-ink-500 mt-0.5">{t('ai.sub')}</p>
        </div>
      </div>

      <div className="flex gap-2 max-w-2xl mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder={t('ai.placeholder')}
          className="flex-1 border border-line rounded-md px-4 py-3 text-sm outline-none focus:border-navy-500 bg-surface"
        />
        <Button variant="primary" onClick={() => submit()} disabled={thinking}>
          <Send size={16} />
          {t('ai.send')}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 max-w-2xl">
        {SUGGESTIONS.map((sg) => (
          <button
            key={sg.en}
            onClick={() => submit(L(sg))}
            disabled={thinking}
            className="text-xs font-semibold text-navy-700 bg-surface border border-line rounded-full px-3.5 py-2 hover:border-navy-500 hover:bg-sand-100 transition-colors disabled:opacity-50"
          >
            {L(sg)}
          </button>
        ))}
      </div>

      <div className="max-w-2xl">
        {errorBanner && (
          <div className="flex items-start gap-2.5 bg-warning-bg text-warning rounded-md px-4 py-3 mb-4 text-sm animate-fade-in-up">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <p>
              {errorBanner} {L(STRINGS.fallbackHint)}
            </p>
          </div>
        )}

        {thinking && (
          <Card className="p-6 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" />
            </div>
            <p className="text-xs text-ink-300">{L(STRINGS.thinking)}</p>
          </Card>
        )}

        {/* Live Claude answer — free-form prose grounded in the student's
            profile and (best-effort) the official UB Bisha website. */}
        {!thinking && aiResult && (
          <Card className="p-6 animate-fade-in-up">
            <div className="flex items-start gap-3.5 pb-5 mb-5 border-b border-line-soft">
              <img src={ASSISTANT_AVATAR} alt="" className="w-11 h-11 rounded-full object-cover ring-2 ring-teal-500/40 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wide">{L(ASSISTANT_NAME)}</h3>
                <p className="text-xs text-ink-300 mt-0.5">{L(STRINGS.poweredBy)}</p>
              </div>
            </div>

            <div className="text-sm text-ink-800 leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {aiResult.reply}
              </ReactMarkdown>
            </div>
          </Card>
        )}

        {/* Offline fallback — the original local, rule-based engine, used
            only when the Claude API can't be reached. */}
        {!thinking && offlineResult && (
          <Card className="p-6 animate-fade-in-up">
            <div className="flex items-start justify-between gap-3 pb-5 mb-5 border-b border-line-soft">
              <div className="flex items-start gap-3.5">
                <span className="w-11 h-11 rounded-md bg-navy-700/10 text-navy-700 flex items-center justify-center shrink-0">
                  <Sparkles size={20} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wide">{t('ai.recommendation')}</h3>
                  <p className="text-lg font-bold text-ink-900">{L(offlineResult.title)}</p>
                </div>
              </div>
            </div>

            <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-warning bg-warning-bg rounded-full px-2.5 py-1 mb-4">
              {L(STRINGS.offlineBadge)}
            </span>

            <p className="text-sm text-ink-700 leading-relaxed mb-5">{L(offlineResult.desc)}</p>

            {offlineResult.checks.length > 0 && (
              <div className="mb-5">
                <h6 className="text-xs font-bold uppercase tracking-wide text-ink-500 mb-2.5">{t('ai.eligibility')}</h6>
                {offlineResult.checks.map((c, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-ink-900 py-1">
                    <CheckCircle2 size={16} className="text-success shrink-0" />
                    {L(c)}
                  </div>
                ))}
              </div>
            )}

            {offlineResult.docs.length > 0 && (
              <div className="mb-5">
                <h6 className="text-xs font-bold uppercase tracking-wide text-ink-500 mb-2.5">{t('ai.requiredDocs')}</h6>
                {offlineResult.docs.map((d, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-ink-900 py-1">
                    <FileText size={16} className="text-navy-500 shrink-0" />
                    {L(d)}
                  </div>
                ))}
              </div>
            )}

            {offlineResult.steps > 0 && (
              <div className="mb-6">
                <h6 className="text-xs font-bold uppercase tracking-wide text-ink-500 mb-2.5">{t('ai.estProcess')}</h6>
                <div className="flex items-center gap-2.5 text-sm text-ink-900">
                  <ListChecks size={16} className="text-navy-500 shrink-0" />
                  {offlineResult.steps} {t('ai.steps')}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2.5">
              {offlineResult.regulationId && (
                <Button variant="ghost" size="sm" onClick={() => openRegulation(offlineResult.regulationId)}>
                  <ScrollText size={16} />
                  {t('ai.viewRegulation')}
                </Button>
              )}
            </div>
          </Card>
        )}

        {!thinking && notUnderstood && (
          <Card className="p-8 text-center animate-fade-in-up">
            <span className="w-14 h-14 rounded-full bg-sand-100 flex items-center justify-center mx-auto mb-4">
              <HelpCircle size={24} className="text-ink-300" />
            </span>
            <h3 className="text-base font-bold text-ink-900 mb-1.5">{t('ai.notUnderstood.title')}</h3>
            <p className="text-sm text-ink-500 mb-5">{refusalNote || t('ai.notUnderstood.body')}</p>
            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              <Button variant="ghost" size="sm" onClick={() => navigate('/app/services')}>
                {t('svc.title')}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/app/services/it-helpdesk')}>
                {L({ en: 'IT Helpdesk', ar: 'الدعم التقني' })}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
