import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  LayoutGrid,
  ListChecks,
  Bell,
  User,
  Settings,
  LogOut,
  Globe,
  X,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';
import { ASSISTANT_NAME } from '../../lib/assistant';
import Avatar from '../ui/Avatar';
import logo from '../../assets/logo.png';

const NAV_ITEMS = [
  { to: '/app/dashboard', icon: LayoutDashboard, key: 'sidebar.dashboard', fallback: { en: 'Dashboard', ar: 'لوحة التحكم' } },
  { to: '/app/ai', icon: Sparkles, key: null, fallback: ASSISTANT_NAME },
  { to: '/app/services', icon: LayoutGrid, key: 'nav.services', fallback: { en: 'Services', ar: 'الخدمات' } },
  { to: '/app/tracker', icon: ListChecks, key: 'tracker.title', fallback: { en: 'Request Tracker', ar: 'متتبع الطلبات' } },
  { to: '/app/notifications', icon: Bell, key: 'notif.title', fallback: { en: 'Notifications', ar: 'الإشعارات' } },
  { to: '/app/profile', icon: User, key: 'profile.title', fallback: { en: 'Profile', ar: 'الملف الشخصي' } },
  { to: '/app/settings', icon: Settings, key: 'settings.title', fallback: { en: 'Settings', ar: 'الإعدادات' } },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const { t, L, isRtl } = useLanguage();
  const { student, logout } = useAuth();
  const { notifications } = useAppState();
  const unread = notifications.filter((n) => !n.read).length;

  // Computed in JS (not via stacked Tailwind rtl:/ltr: + md: variants):
  // rtl:/ltr: compile to `[dir="ltr"] .class` attribute selectors, which
  // have *higher* specificity than a plain `md:class` media-query utility.
  // That meant the "hidden off-canvas" transform was always beating the
  // "visible on desktop" transform, regardless of screen width — the
  // sidebar was permanently translated out of view on large screens.
  const sideClass = isRtl ? 'right-0' : 'left-0';
  const hiddenTransform = isRtl ? 'translate-x-full' : '-translate-x-full';

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-navy-950/40 z-40 md:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={`fixed md:sticky top-0 h-screen w-[264px] bg-navy-900 text-white flex flex-col z-50 transition-transform duration-200 shrink-0 ${sideClass} ${
          mobileOpen ? 'translate-x-0' : hiddenTransform
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-5 h-[72px] border-b border-white/10">
          <Link to="/" className="bg-white rounded-md p-2 inline-flex" title={t('footer.home')}>
            <img src={logo} alt="UB Smart" className="h-7 w-auto" />
          </Link>
          <button className="md:hidden text-white/70 p-1" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {student && (
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
            <Avatar src={student.avatar} initials={student.initials} size={40} ringClassName="ring-2 ring-teal-500/40" />
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">{L(student.name)}</p>
              <p className="text-xs text-white/60 truncate">{L(student.program)}</p>
            </div>
          </div>
        )}

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors relative ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon size={18} strokeWidth={2} />
              <span className="flex-1">
                {item.key && t(item.key) !== item.key ? t(item.key) : L(item.fallback)}
              </span>
              {item.to === '/app/notifications' && unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-teal-500 text-navy-900 text-[10px] font-bold flex items-center justify-center">
                  {unread}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <Globe size={18} strokeWidth={2} />
            {t('footer.home')}
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut size={18} strokeWidth={2} />
            {t('nav.logout')}
          </button>
        </div>
      </aside>
    </>
  );
}
