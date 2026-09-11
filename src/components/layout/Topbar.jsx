import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Globe, ChevronDown, LogOut, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';
import { SERVICES } from '../../data/services';
import { REGULATIONS } from '../../data/regulations';
import Avatar from '../ui/Avatar';

export default function Topbar({ onMenuClick }) {
  const { t, L, toggleLang } = useLanguage();
  const { student, logout } = useAuth();
  const { notifications, isDark, toggleTheme } = useAppState();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  const results = useMemo(() => {
    if (!query.trim()) return { services: [], regulations: [] };
    const q = query.toLowerCase();
    return {
      services: SERVICES.filter((s) => L(s.name).toLowerCase().includes(q)).slice(0, 4),
      regulations: REGULATIONS.filter((r) => L(r.title).toLowerCase().includes(q)).slice(0, 3),
    };
  }, [query, L]);

  const hasResults = results.services.length > 0 || results.regulations.length > 0;

  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur border-b border-line-soft">
      <div className="h-[72px] px-4 sm:px-6 flex items-center gap-3">
        <button className="md:hidden p-2 text-ink-700 shrink-0" onClick={onMenuClick} aria-label="Menu">
          <Menu size={22} />
        </button>

        <div className="relative flex-1 max-w-md">
          <Search
            size={17}
            className="absolute top-1/2 -translate-y-1/2 ltr:left-3.5 rtl:right-3.5 text-ink-300"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder={t('topbar.search')}
            className="w-full bg-sand-100 border border-transparent focus:border-navy-500 focus:bg-surface rounded-md ltr:pl-10 rtl:pr-10 ltr:pr-3 rtl:pl-3 py-2.5 text-sm outline-none transition-colors"
          />
          {focused && query.trim() && (
            <div className="absolute top-full mt-2 w-full bg-surface border border-line-soft rounded-md shadow-lg py-2 max-h-80 overflow-y-auto z-20">
              {!hasResults && <p className="px-4 py-3 text-sm text-ink-500">{t('search.noResults')}</p>}
              {results.services.length > 0 && (
                <div className="px-2">
                  <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-300">
                    {t('nav.services')}
                  </p>
                  {results.services.map((s) => (
                    <button
                      key={s.id}
                      className="w-full text-start px-2 py-2 rounded-md hover:bg-sand-100 text-sm text-ink-900"
                      onClick={() => navigate(`/app/services/${s.id}`)}
                    >
                      {L(s.name)}
                    </button>
                  ))}
                </div>
              )}
              {results.regulations.length > 0 && (
                <div className="px-2 mt-1">
                  <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-300">
                    {t('detail.regulation')}
                  </p>
                  {results.regulations.map((r) => (
                    <div key={r.id} className="px-2 py-2 text-sm text-ink-700">
                      {L(r.title)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex-1" />

        <button onClick={toggleLang} className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-navy-700 px-2 py-1.5">
          <Globe size={16} />
        </button>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-navy-700 p-2"
          aria-label="Toggle theme"
          title={isDark ? t('settings.light') : t('settings.dark')}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          className="relative p-2 text-ink-700 hover:text-navy-700"
          onClick={() => navigate('/app/notifications')}
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unread > 0 && (
            <span className="absolute top-1 ltr:right-1 rtl:left-1 w-2 h-2 rounded-full bg-teal-500" />
          )}
        </button>

        {student && (
          <button
            className="flex items-center gap-2 ps-2 pe-1 py-1 rounded-md hover:bg-sand-100"
            onClick={() => navigate('/app/profile')}
          >
            <Avatar src={student.avatar} initials={student.initials} size={32} className="text-xs" />
            <ChevronDown size={14} className="hidden sm:block text-ink-500" />
          </button>
        )}

        <button
          className="flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-danger px-2.5 py-2 rounded-md hover:bg-danger-bg transition-colors"
          onClick={logout}
          title={t('nav.logout')}
        >
          <LogOut size={18} />
          <span className="hidden md:inline">{t('nav.logout')}</span>
        </button>
      </div>
    </header>
  );
}
