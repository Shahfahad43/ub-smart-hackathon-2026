import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, BookOpen, Briefcase, FileText, FileCheck, LifeBuoy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { SERVICES, CATEGORY_LABELS } from '../data/services';

const ICON_MAP = {
  'user-check': UserCheck,
  'book-open': BookOpen,
  briefcase: Briefcase,
  'file-text': FileText,
  'file-check': FileCheck,
  'life-buoy': LifeBuoy,
};

export default function Services() {
  const { t, L } = useLanguage();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...Object.keys(CATEGORY_LABELS)];
  const list = filter === 'all' ? SERVICES : SERVICES.filter((s) => s.category === filter);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl text-ink-900">{t('svc.title')}</h1>
        <p className="text-sm text-ink-500 mt-1">{t('svc.sub')}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`text-xs font-semibold rounded-full px-4 py-2 border transition-colors ${
              filter === c
                ? 'bg-navy-700 text-white border-navy-700'
                : 'bg-surface text-ink-700 border-line hover:border-navy-500'
            }`}
          >
            {c === 'all' ? t('svc.filter.all') : L(CATEGORY_LABELS[c])}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((s) => {
          const Icon = ICON_MAP[s.icon] || FileText;
          return (
            <Card key={s.id} className="p-5 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between mb-3.5">
                <span className="w-11 h-11 rounded-md bg-teal-500/10 text-teal-600 flex items-center justify-center">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <span className="text-[11px] font-semibold text-ink-500 bg-sand-100 rounded-full px-2.5 py-1">
                  {L(CATEGORY_LABELS[s.category])}
                </span>
              </div>
              <h4 className="text-base font-bold text-ink-900 mb-1.5">{L(s.name)}</h4>
              <p className="text-sm text-ink-500 leading-relaxed mb-4 flex-1">{L(s.desc)}</p>
              <div className="flex items-center justify-between text-xs text-ink-500 mb-4">
                <span>{L(s.time)}</span>
                <span>
                  {s.docs.length} {t('svc.docs')}
                </span>
              </div>
              <Button variant="primary" size="sm" className="w-full" onClick={() => navigate(`/app/services/${s.id}`)}>
                {t('svc.open')}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
