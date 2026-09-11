import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Info, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { STUDENTS } from '../data/students';
import { SERVICES } from '../data/services';
import { ASSISTANT_NAME } from '../lib/assistant';
import Avatar from '../components/ui/Avatar';
import logo from '../assets/logo.png';
import heroImg from '../assets/hero.webp';

export default function Login() {
  const { t, L, lang } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If the person clicked a service (or the AI preview) on the landing page
  // before being sent here to sign in, `from` carries that destination so
  // login drops them back exactly where they meant to go.
  const from = location.state?.from || '/app/dashboard';
  const hasIntent = !!location.state?.from;
  const [showPicker, setShowPicker] = useState(hasIntent);

  const intendedService = hasIntent ? SERVICES.find((s) => from === `/app/services/${s.id}`) : null;
  const intendedLabel = intendedService ? L(intendedService.name) : hasIntent && from === '/app/ai' ? L(ASSISTANT_NAME) : null;

  const handleDemoLogin = (key) => {
    login(key);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <Link
        to="/"
        className="fixed top-4 z-50 ltr:left-4 rtl:right-4 inline-flex items-center gap-1.5 bg-white text-navy-800 text-xs font-bold px-3.5 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-sand-100 transition-all"
      >
        <ArrowLeft size={14} className="rtl-flip" />
        {t('footer.home')}
      </Link>

      {/* Left visual panel */}
      <div className="hidden lg:flex relative bg-navy-950 items-center justify-center p-12 overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/50" />
        <div className="relative max-w-md text-center">
          <div className="bg-white inline-flex rounded-md p-3 mb-8">
            <img src={logo} alt="University of Bisha" className="h-10 w-auto" />
          </div>
          <p className="text-xl text-white leading-relaxed font-medium">{t('login.quote')}</p>
          <p className="text-sm text-teal-400 font-semibold mt-4">{t('login.quoteSub')}</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center px-6 py-12 animate-fade-in-up">
        <div className="w-full max-w-sm">
          <div className="lg:hidden bg-navy-700 inline-flex rounded-md p-2.5 mb-8">
            <img src={logo} alt="University of Bisha" className="h-8 w-auto" />
          </div>

          <h1 className="text-2xl font-extrabold text-ink-900 mb-1.5">{t('login.title')}</h1>
          <p className="text-sm text-ink-500 mb-5">{t('login.sub')}</p>

          {intendedLabel && (
            <div className="flex items-center gap-2 mb-5 bg-teal-100/50 border border-teal-500/25 rounded-md px-3.5 py-2.5">
              <ShieldCheck size={15} className="text-teal-600 shrink-0" />
              <p className="text-xs text-navy-800">
                {lang === 'ar' ? 'سجّل الدخول للمتابعة إلى' : 'Sign in to continue to'} <strong>{intendedLabel}</strong>
              </p>
            </div>
          )}

          {!showPicker ? (
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3.5 border border-line rounded-md px-4 py-3.5 hover:border-navy-500 hover:bg-sand-100 transition-colors text-start">
                <span className="w-10 h-10 rounded-md bg-navy-700/10 text-navy-700 flex items-center justify-center shrink-0">
                  <ShieldCheck size={19} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink-900">{t('login.uniAccount')}</span>
                  <span className="block text-xs text-ink-500">{t('login.uniAccountSub')}</span>
                </span>
              </button>

              <button className="w-full flex items-center gap-3.5 border border-line rounded-md px-4 py-3.5 hover:border-navy-500 hover:bg-sand-100 transition-colors text-start">
                <span className="w-10 h-10 rounded-md bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0 font-bold text-xs">
                  ن
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink-900">{t('login.nafath')}</span>
                  <span className="block text-xs text-ink-500">{t('login.nafathSub')}</span>
                </span>
              </button>

              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-line" />
                <span className="text-xs font-bold text-ink-300">{t('login.or')}</span>
                <div className="flex-1 h-px bg-line" />
              </div>

              <Button variant="primary" size="lg" className="w-full" onClick={() => setShowPicker(true)}>
                {t('login.demo')}
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-sm font-bold text-ink-900 mb-3.5">{t('login.choose')}</p>
              <div className="space-y-2.5">
                {Object.values(STUDENTS).map((s) => (
                  <button
                    key={s.key}
                    onClick={() => handleDemoLogin(s.key)}
                    className="w-full flex items-center gap-3.5 border border-line rounded-md px-4 py-3.5 hover:border-teal-500 hover:bg-teal-100/40 transition-colors text-start"
                  >
                    <Avatar src={s.avatar} initials={s.initials} size={40} />
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-ink-900 truncate">{L(s.name)}</span>
                      <span className="block text-xs text-ink-500 truncate">{L(s.program)}</span>
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowPicker(false)}
                className="text-xs font-semibold text-ink-500 hover:text-navy-700 mt-4"
              >
                ← {t('detail.back')}
              </button>
            </div>
          )}

          <div className="flex items-start gap-2 mt-8 bg-sand-100 rounded-md px-3.5 py-3">
            <Info size={15} className="text-ink-500 shrink-0 mt-0.5" />
            <p className="text-xs text-ink-500 leading-relaxed">{t('login.note')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
