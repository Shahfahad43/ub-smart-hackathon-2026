import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, UserCheck, BookOpen, Briefcase, FileText, FileCheck, LifeBuoy, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { Card, EmptyState } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { SERVICES } from '../data/services';
import { REGULATIONS } from '../data/regulations';
import { LIBRARY_RESOURCES } from '../data/libraryBooks';

const ICON_MAP = {
  'user-check': UserCheck,
  'book-open': BookOpen,
  briefcase: Briefcase,
  'file-text': FileText,
  'file-check': FileCheck,
  'life-buoy': LifeBuoy,
};

export default function ServiceDetail() {
  const { id } = useParams();
  const { t, L } = useLanguage();
  const { student } = useAuth();
  const { showToast } = useAppState();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const s = SERVICES.find((x) => x.id === id);
  if (!s) {
    return (
      <EmptyState icon={FileText} title="Not found" body="" action={<Button onClick={() => navigate('/app/services')}>{t('detail.back')}</Button>} />
    );
  }

  const reg = s.regulationId ? REGULATIONS.find((r) => r.id === s.regulationId) : null;
  const Icon = ICON_MAP[s.icon] || FileText;

  // For the Digital Libraries service, show resources tagged for the
  // logged-in student's program first, then general cross-discipline ones.
  const programBooks = s.hasLibraryResources
    ? LIBRARY_RESOURCES.filter((r) => r.field === student?.key)
    : [];
  const generalBooks = s.hasLibraryResources ? LIBRARY_RESOURCES.filter((r) => r.field === 'general') : [];

  const openRegulation = () => {
    if (!reg) return;
    showToast(`${L(reg.title)}: ${L(reg.summary)}`, 'ScrollText');
  };

  return (
    <div>
      <button
        onClick={() => navigate('/app/services')}
        className="flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-navy-700 mb-5"
      >
        <ArrowLeft size={15} className="rtl-flip" />
        {t('detail.back')}
      </button>

      <div className="flex items-center gap-4 mb-6">
        <span className="w-14 h-14 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
          <Icon size={24} strokeWidth={2} />
        </span>
        <div>
          <h1 className="text-xl sm:text-2xl text-ink-900">{L(s.name)}</h1>
          <p className="text-sm text-ink-500 mt-0.5">{L(s.desc)}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <Card className="p-6">
            <h3 className="text-base font-bold text-ink-900 mb-3">{t('detail.eligibility')}</h3>
            <p className="text-sm text-ink-700 leading-relaxed">{L(s.eligibility)}</p>
          </Card>

          {s.hasLibraryResources && (
            <Card className="p-6">
              <h3 className="text-base font-bold text-ink-900 mb-1">
                {L({ en: 'Recommended for your program', ar: 'موصى بها لتخصصك' })}
              </h3>
              <p className="text-xs text-ink-500 mb-4">
                {student
                  ? L({ en: `Curated for ${L(student.program)} students`, ar: `منتقاة لطلاب ${L(student.program)}` })
                  : L({ en: 'Sign in to see recommendations for your program', ar: 'سجّل الدخول لعرض التوصيات الخاصة بتخصصك' })}
              </p>
              <div className="space-y-2.5 mb-5">
                {programBooks.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 border border-line-soft rounded-md p-3">
                    <span className="w-8 h-8 rounded-md bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0">
                      <BookOpen size={15} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-ink-900 truncate">{L(r.title)}</p>
                      <p className="text-xs text-ink-500">
                        {r.author} · {L(r.type)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-bold uppercase tracking-wide text-ink-500 mb-2.5">
                {L({ en: 'General research databases', ar: 'قواعد بيانات بحثية عامة' })}
              </h4>
              <div className="space-y-2.5">
                {generalBooks.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 border border-line-soft rounded-md p-3">
                    <span className="w-8 h-8 rounded-md bg-navy-700/10 text-navy-700 flex items-center justify-center shrink-0">
                      <BookOpen size={15} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-ink-900 truncate">{L(r.title)}</p>
                      <p className="text-xs text-ink-500">{r.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="p-6">
            <h3 className="text-base font-bold text-ink-900 mb-4">{t('detail.steps')}</h3>
            <div className="space-y-4">
              {s.steps.map((st, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-navy-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-ink-900 pt-0.5">{L(st)}</p>
                </div>
              ))}
            </div>
          </Card>

          {s.faqs.length > 0 && (
            <Card className="p-6">
              <h3 className="text-base font-bold text-ink-900 mb-3">{t('detail.faq')}</h3>
              {s.faqs.map((f, i) => (
                <div key={i} className="border-t border-line-soft first:border-t-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-3 py-3.5 text-start"
                  >
                    <span className="text-sm font-semibold text-ink-900">{L(f.q)}</span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-ink-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && <p className="text-sm text-ink-500 leading-relaxed pb-4">{L(f.a)}</p>}
                </div>
              ))}
            </Card>
          )}
        </div>

        <div className="space-y-5 lg:sticky lg:top-24 self-start">
          <Card className="p-6">
            <h3 className="text-base font-bold text-ink-900 mb-3.5">{t('detail.docs')}</h3>
            <div className="space-y-2.5">
              {s.docs.map((d, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-ink-900">
                  <FileText size={16} className="text-navy-500 shrink-0" />
                  {L(d)}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">{t('detail.time')}</span>
              <strong className="text-navy-900">{L(s.time)}</strong>
            </div>
            {reg && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-500">{t('detail.regulation')}</span>
                <button className="font-bold text-navy-600 hover:text-navy-800" onClick={openRegulation}>
                  {reg.id}
                </button>
              </div>
            )}
          </Card>

          <Button variant="primary" className="w-full" onClick={() => navigate(`/app/services/${s.id}/request`)}>
            {t('detail.start')}
          </Button>
        </div>
      </div>
    </div>
  );
}
