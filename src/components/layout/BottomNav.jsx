import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Sparkles, LayoutGrid, ListChecks, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ASSISTANT_NAME } from '../../lib/assistant';

const ITEMS = [
  { to: '/app/dashboard', icon: LayoutDashboard, fallback: { en: 'Home', ar: 'الرئيسية' } },
  { to: '/app/services', icon: LayoutGrid, fallback: { en: 'Services', ar: 'الخدمات' } },
  { to: '/app/ai', icon: Sparkles, fallback: ASSISTANT_NAME },
  { to: '/app/tracker', icon: ListChecks, fallback: { en: 'Tracker', ar: 'المتابعة' } },
  { to: '/app/profile', icon: User, fallback: { en: 'Profile', ar: 'ملفي' } },
];

export default function BottomNav() {
  const { L } = useLanguage();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-line-soft flex items-stretch h-16">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 text-[11px] font-semibold ${
              isActive ? 'text-navy-700' : 'text-ink-300'
            }`
          }
        >
          <item.icon size={20} strokeWidth={2} />
          {L(item.fallback)}
        </NavLink>
      ))}
    </nav>
  );
}
