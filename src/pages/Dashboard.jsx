import { useNavigate } from 'react-router-dom';
import { TrendingUp, Layers, CheckCircle, CalendarCheck, Sparkles, ArrowRight, MonitorPlay, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { DEADLINES } from '../data/deadlines';
import { gradeColor, levelColor, greetingKey } from '../lib/utils';
import { ASSISTANT_NAME, ASSISTANT_AVATAR } from '../lib/assistant';
import { BLACKBOARD_URL } from '../lib/blackboardData';

const ASK_LABEL = { en: `Ask ${ASSISTANT_NAME.en}`, ar: `اسأل ${ASSISTANT_NAME.ar}` };
const BB_LABEL = { en: 'Blackboard', ar: 'Blackboard' };
const BB_SUB = { en: 'Join class or open your AI learning companion', ar: 'انضم للمحاضرة أو افتح رفيقك الذكي للتعلّم' };
const BB_OPEN = { en: 'Open', ar: 'فتح' };
const BB_COMPANION = { en: 'AI Companion', ar: 'الرفيق الذكي' };

export default function Dashboard() {
  const { t, L } = useLanguage();
  const { student } = useAuth();
  const navigate = useNavigate();

  if (!student) return null;

  const firstName = L(student.name).split(' ')[0];
  const pct = Math.round((student.creditsDone / student.creditsTotal) * 100);

  const stats = [
    { icon: TrendingUp, bg: 'bg-info-bg', color: 'text-info', label: t('stat.gpa'), value: `${student.gpa.toFixed(2)} / 5` },
    { icon: Layers, bg: 'bg-teal-100', color: 'text-teal-600', label: t('stat.level'), value: student.level },
    { icon: CheckCircle, bg: 'bg-success-bg', color: 'text-success', label: t('stat.credits'), value: `${student.creditsDone}/${student.creditsTotal}` },
    { icon: CalendarCheck, bg: 'bg-warning-bg', color: 'text-warning', label: t('stat.attendance'), value: `${student.attendance}%` },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl text-ink-900">
          {t(greetingKey())}, {firstName}
        </h1>
        <p className="text-sm text-ink-500 mt-1">{t('dash.subtitle')}</p>
      </div>

      <button
        onClick={() => navigate('/app/ai')}
        className="w-full flex items-center gap-4 bg-navy-900 hover:bg-navy-800 transition-colors text-white rounded-lg p-4 mb-6 text-start"
      >
        <img src={ASSISTANT_AVATAR} alt="" className="w-11 h-11 rounded-full object-cover ring-2 ring-teal-500/50 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold">{L(ASK_LABEL)}</p>
          <p className="text-xs text-white/60 truncate">{t('ai.sub')}</p>
        </div>
        <ArrowRight size={18} className="rtl-flip shrink-0" />
      </button>

      {/* Direct access to Blackboard from the dashboard */}
      <Card className="p-4 mb-6 flex flex-wrap items-center gap-4">
        <span className="w-11 h-11 rounded-md bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0">
          <MonitorPlay size={20} strokeWidth={2} />
        </span>
        <div className="flex-1 min-w-[160px]">
          <p className="text-sm font-bold text-ink-900">{L(BB_LABEL)}</p>
          <p className="text-xs text-ink-500 truncate">{L(BB_SUB)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => navigate('/app/blackboard')}>
            {L(BB_COMPANION)}
          </Button>
          <Button as="a" href={BLACKBOARD_URL} target="_blank" rel="noopener noreferrer" variant="primary" size="sm">
            <ExternalLink size={14} />
            {L(BB_OPEN)}
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <Card key={s.label} className="p-4 sm:p-5">
            <span className={`w-9 h-9 rounded-md flex items-center justify-center mb-3 ${s.bg} ${s.color}`}>
              <s.icon size={17} strokeWidth={2} />
            </span>
            <p className="text-xs text-ink-500 mb-0.5">{s.label}</p>
            <p className="text-xl font-extrabold text-ink-900">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <Card className="p-6 bg-gradient-to-br from-navy-700 to-navy-900 text-white border-none">
            <span className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center mb-4">
              <Sparkles size={18} className="text-teal-400" />
            </span>
            <h4 className="text-base font-bold mb-1.5">{t('insight1.title')}</h4>
            <p className="text-sm text-white/75 leading-relaxed mb-4">{t('insight1.body', { pct })}</p>
            <Button variant="accent" size="sm" onClick={() => navigate('/app/services/academic-advising')}>
              {t('insight1.cta')}
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-bold text-ink-900 mb-4">{t('widget.schedule')}</h3>
            <div className="space-y-0">
              {student.schedule.map((row, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 py-3 ${i !== student.schedule.length - 1 ? 'border-b border-line-soft' : ''} ${
                    row.isBreak ? 'opacity-50' : ''
                  }`}
                >
                  <span className="text-xs font-mono font-semibold text-ink-500 w-12 shrink-0">{row.time}</span>
                  <span className="w-1 h-8 rounded-full bg-teal-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-ink-900 truncate">{L(row.course)}</p>
                    {row.room && <p className="text-xs text-ink-500">{row.room}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-ink-900">{t('widget.grades')}</h3>
              <button className="text-xs font-semibold text-teal-600 hover:text-teal-700" onClick={() => navigate('/app/profile')}>
                {t('widget.viewAllGrades')}
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-start">
                  <th className="text-start font-semibold text-ink-500 text-xs pb-2.5">{t('col.course')}</th>
                  <th className="text-start font-semibold text-ink-500 text-xs pb-2.5">{t('col.grade')}</th>
                  <th className="text-start font-semibold text-ink-500 text-xs pb-2.5">{t('col.credits')}</th>
                </tr>
              </thead>
              <tbody>
                {student.grades.map((g, i) => (
                  <tr key={i} className="border-t border-line-soft">
                    <td className="py-2.5 text-ink-900 font-medium">{L(g.course)}</td>
                    <td className="py-2.5">
                      <span
                        className="inline-flex items-center justify-center w-9 h-6 rounded text-xs font-bold"
                        style={{ background: `${gradeColor(g.grade)}20`, color: gradeColor(g.grade) }}
                      >
                        {g.grade}
                      </span>
                    </td>
                    <td className="py-2.5 text-ink-500">{g.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="p-6">
            <h3 className="text-base font-bold text-ink-900 mb-4">{t('widget.progress')}</h3>
            <div className="h-2.5 bg-sand-200 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex items-center justify-between mt-2.5 text-xs">
              <span className="text-ink-500">
                {student.creditsDone} {t('widget.completed')}
              </span>
              <strong className="text-ink-900">{pct}%</strong>
            </div>
            <div className="flex items-center justify-between mt-3.5 pt-3.5 border-t border-line-soft text-sm">
              <span className="text-ink-500">{t('widget.gradYear')}</span>
              <strong className="text-navy-900">{student.gradYear}</strong>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-bold text-ink-900 mb-4">{t('widget.deadlines')}</h3>
            <div className="space-y-3.5">
              {DEADLINES.map((d) => (
                <div key={d.key} className="flex items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-md flex flex-col items-center justify-center shrink-0 text-center leading-none"
                    style={{ background: `${levelColor(d.level)}18`, color: levelColor(d.level) }}
                  >
                    <b className="text-sm">{d.date.d}</b>
                    <span className="text-[9px] font-bold uppercase mt-0.5">{L(d.date.m)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-ink-900 truncate">{L(d.title)}</p>
                    <p className="text-xs text-ink-500">
                      {d.days} {d.days === 1 ? t('day.remaining') : t('days.remaining')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-bold text-ink-900 mb-4">{t('widget.recommended')}</h3>
            <div className="space-y-3">
              {student.recommendations.map((r, i) => (
                <div key={i} className="border border-line-soft rounded-md p-3.5">
                  <span className="inline-block text-[10px] font-bold uppercase text-teal-600 bg-teal-100 rounded-full px-2 py-0.5 mb-2">
                    {L(r.tag)}
                  </span>
                  <p className="text-sm font-bold text-ink-900 mb-0.5">{L(r.title)}</p>
                  <p className="text-xs text-ink-500">{L(r.meta)}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
