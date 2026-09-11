import { useNavigate } from 'react-router-dom';
import { Inbox, Send, Search, Building2, CheckCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppState } from '../context/AppStateContext';
import { Card, EmptyState } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { SERVICES } from '../data/services';
import { statusMeta } from '../lib/utils';

const STAGES = ['submitted', 'review', 'verification', 'completed'];
const STAGE_ICONS = [Send, Search, Building2, CheckCheck];

export default function Tracker() {
  const { t, L } = useLanguage();
  const { requests } = useAppState();
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl text-ink-900">{t('tracker.title')}</h1>
        <p className="text-sm text-ink-500 mt-1">{t('tracker.sub')}</p>
      </div>

      {requests.length === 0 ? (
        <Card>
          <EmptyState
            icon={Inbox}
            title={t('tracker.empty.title')}
            body={t('tracker.empty.body')}
            action={
              <Button variant="primary" onClick={() => navigate('/app/services')}>
                {t('tracker.empty.cta')}
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="space-y-5">
          {requests.map((r) => (
            <TrackerItem key={r.id} request={r} t={t} L={L} />
          ))}
        </div>
      )}
    </div>
  );
}

function TrackerItem({ request: r, t, L }) {
  const svc = SERVICES.find((s) => s.id === r.serviceId);
  const meta = statusMeta(r.status);
  const isRejected = r.status === 'rejected';
  const normalized = r.status === 'actionRequired' ? 'review' : r.status === 'approved' ? 'completed' : r.status;
  const currentIdx = STAGES.indexOf(normalized);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-ink-900">{svc ? L(svc.name) : r.id}</h3>
          <span className="text-xs text-ink-500">
            {t('tracker.submittedOn')}: {r.submitted}
          </span>
        </div>
        <Badge tone={meta.pill}>{t(meta.label)}</Badge>
      </div>

      <div className="flex items-start mb-6 overflow-x-auto">
        {STAGES.map((st, i) => {
          const Icon = STAGE_ICONS[i];
          let state = 'upcoming';
          if (isRejected && i > 0 && i <= currentIdx) state = 'rejected';
          else if (i < currentIdx) state = 'done';
          else if (i === currentIdx) state = 'current';

          const dotClasses = {
            done: 'bg-success text-white',
            current: 'bg-navy-700 text-white ring-4 ring-navy-700/15',
            rejected: 'bg-danger text-white',
            upcoming: 'bg-sand-200 text-ink-300',
          }[state];

          return (
            <div key={st} className="flex-1 min-w-[90px] flex flex-col items-center relative">
              {i > 0 && (
                <div
                  className={`absolute top-4 h-0.5 w-full -translate-x-1/2 ltr:left-0 rtl:right-0 ${
                    state === 'upcoming' ? 'bg-sand-200' : state === 'rejected' ? 'bg-danger' : 'bg-success'
                  }`}
                  style={{ insetInlineStart: 0, width: '100%', transform: 'translateX(-50%)' }}
                />
              )}
              <span className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${dotClasses}`}>
                <Icon size={14} strokeWidth={2.5} />
              </span>
              <span className="text-[11px] font-semibold text-ink-700 mt-2 text-center leading-tight">
                {t('tracker.' + st)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-3 gap-4 pt-5 border-t border-line-soft text-sm">
        <div>
          <p className="text-xs text-ink-500 mb-0.5">{t('tracker.department')}</p>
          <p className="font-bold text-ink-900">{L(r.department)}</p>
        </div>
        <div>
          <p className="text-xs text-ink-500 mb-0.5">{t('tracker.expected')}</p>
          <p className="font-bold text-ink-900">{r.expected || '—'}</p>
        </div>
        <div>
          <p className="text-xs text-ink-500 mb-0.5">{t('form.id')}</p>
          <p className="font-bold text-ink-900 font-mono">{r.id}</p>
        </div>
      </div>
    </Card>
  );
}
