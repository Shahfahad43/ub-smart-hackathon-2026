import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import logo from '../../assets/logo.png';

const DASHBOARD_LABEL = { en: 'Dashboard', ar: 'لوحة التحكم' };

export default function PublicNavbar() {
  const { t, L, toggleLang } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/#services', label: t('nav.services') },
    { to: '/#ai', label: t('nav.ai') },
    { to: '/#how', label: t('nav.how') },
  ];

  // If the student is still logged in (they came here via the sidebar's
  // "University Website" link, for example), the CTA should take them back
  // into the app instead of forcing them through login again.
  const goToApp = () => navigate(isAuthenticated ? '/app/dashboard' : '/login');
  const ctaLabel = isAuthenticated ? L(DASHBOARD_LABEL) : t('nav.enter');

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur border-b border-line-soft">
      <div className="max-w-content mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="University of Bisha" className="h-9 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.to} className="text-sm font-semibold text-ink-700 hover:text-navy-700 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-navy-700 px-2 py-1.5"
          >
            <Globe size={16} />
            {t('footer.switch')}
          </button>
          <Button variant="primary" size="sm" onClick={goToApp}>
            {isAuthenticated && <LayoutDashboard size={15} />}
            {ctaLabel}
          </Button>
        </div>

        <button className="lg:hidden p-2 text-ink-700" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line-soft bg-surface px-5 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a key={l.label} href={l.to} className="text-sm font-semibold text-ink-700 py-1.5" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <button onClick={toggleLang} className="flex items-center gap-1.5 text-sm font-semibold text-ink-700 py-1.5">
            <Globe size={16} />
            {t('footer.switch')}
          </button>
          <Button variant="primary" size="sm" onClick={goToApp} className="mt-1">
            {ctaLabel}
          </Button>
        </div>
      )}
    </header>
  );
}
