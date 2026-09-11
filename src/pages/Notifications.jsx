import { BookOpen, GraduationCap, ClipboardCheck, Library, Landmark, ShieldAlert, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppState } from '../context/AppStateContext';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';

const NOTIF_META = {
  academic: { icon: BookOpen, tone: 'info' },
  graduation: { icon: GraduationCap, tone: 'success' },
  request: { icon: ClipboardCheck, tone: 'warning' },
  library: { icon: Library, tone: 'info' },
  university: { icon: Landmark, tone: 'success' },
  system: { icon: ShieldAlert, tone: 'danger' },
};

const TONE_CLASSES = {
  info: 'bg-info-bg text-info',
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  danger: 'bg-danger-bg text-danger',
};

const SMART_ALERTS = [
  { en: 'Registration is opening soon — review your plan.', ar: 'موعد التسجيل يقترب — راجع خطتك.' },
  { en: 'You are approaching your graduation requirements.', ar: 'أنت تقترب من استيفاء متطلبات التخرج.' },
  { en: 'You have an unresolved request: UB-2026-004821.', ar: 'لديك طلب لم يُستكمل بعد: UB-2026-004821.' },
];

export default function Notifications() {
  const { t, L, lang } = useLanguage();
  const { notifications, markRead, markAllRead, showToast } = useAppState();

  const today = notifications.filter((n) => n.when === 'today');
  const earlier = notifications.filter((n) => n.when === 'earlier');

  const handleMarkAll = () => {
    markAllRead();
    showToast(lang === 'ar' ? 'تم تعليم الكل كمقروء' : 'All marked as read', 'Check');
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl text-ink-900">{t('notif.title')}</h1>
          <p className="text-sm text-ink-500 mt-1">{t('notif.sub')}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={handleMarkAll}>
          {t('notif.markAllRead')}
        </Button>
      </div>

      <p className="text-xs font-bold uppercase tracking-wide text-ink-500 mb-3">{t('notif.smartAlerts')}</p>
      <div className="space-y-2.5 mb-8">
        {SMART_ALERTS.map((sm, i) => (
          <Card key={i} className="p-4 flex items-center gap-3.5 bg-teal-100/40 border-teal-500/20">
            <span className="w-9 h-9 rounded-md bg-teal-500/15 text-teal-600 flex items-center justify-center shrink-0">
              <Zap size={16} />
            </span>
            <p className="text-sm text-ink-900">{L(sm)}</p>
          </Card>
        ))}
      </div>

      {today.length > 0 && (
        <>
          <p className="text-xs font-bold uppercase tracking-wide text-ink-500 mb-3">{t('notif.today')}</p>
          <div className="space-y-2 mb-8">
            {today.map((n) => (
              <NotifRow key={n.id} n={n} L={L} onClick={() => markRead(n.id)} />
            ))}
          </div>
        </>
      )}

      {earlier.length > 0 && (
        <>
          <p className="text-xs font-bold uppercase tracking-wide text-ink-500 mb-3">{t('notif.earlier')}</p>
          <div className="space-y-2">
            {earlier.map((n) => (
              <NotifRow key={n.id} n={n} L={L} onClick={() => markRead(n.id)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function NotifRow({ n, L, onClick }) {
  const meta = NOTIF_META[n.cat] || NOTIF_META.system;
  const Icon = meta.icon;
  return (
    <Card
      className={`p-4 flex items-center gap-3.5 cursor-pointer relative hover:shadow-md transition-shadow ${
        !n.read ? 'border-navy-500/30' : ''
      }`}
      onClick={onClick}
    >
      {!n.read && <span className="absolute top-4 ltr:right-4 rtl:left-4 w-2 h-2 rounded-full bg-teal-500" />}
      <span className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${TONE_CLASSES[meta.tone]}`}>
        <Icon size={16} />
      </span>
      <p className="text-sm text-ink-900 flex-1">{L(n.title)}</p>
      <span className="text-xs text-ink-300 shrink-0">{n.time}</span>
    </Card>
  );
}
