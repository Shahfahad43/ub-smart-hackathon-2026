import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  BellRing,
  LogIn,
  MessageSquare,
  Compass,
  ListChecks,
  ArrowRight,
  CheckCircle2,
  Clock,
  ListOrdered,
  UserCheck,
  BookOpen,
  Briefcase,
  FileCheck,
  LifeBuoy,
} from 'lucide-react';
import PublicNavbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { SERVICES } from '../data/services';
import heroImg from '../assets/hero.webp';
import emblem from '../assets/emblem.png';

const DASHBOARD_LABEL = { en: 'Go to Dashboard', ar: 'الذهاب إلى لوحة التحكم' };

const SERVICE_ICONS = {
  'user-check': UserCheck,
  'book-open': BookOpen,
  briefcase: Briefcase,
  'file-text': FileText,
  'file-check': FileCheck,
  'life-buoy': LifeBuoy,
};

export default function Landing() {
  const { t, L } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // A logged-in student browsing the public site (e.g. via the sidebar's
  // "University Website" link) should be routed straight back into the app,
  // not made to log in again.
  const goToApp = (fallbackFrom) =>
    navigate(isAuthenticated ? '/app/dashboard' : '/login', isAuthenticated ? undefined : { state: { from: fallbackFrom } });

  const features = [
    { icon: LayoutDashboard, title: t('smart.f1t'), desc: t('smart.f1d') },
    { icon: Sparkles, title: t('smart.f2t'), desc: t('smart.f2d') },
    { icon: FileText, title: t('smart.f3t'), desc: t('smart.f3d') },
    { icon: BellRing, title: t('smart.f4t'), desc: t('smart.f4d') },
  ];

  const steps = [
    { icon: LogIn, title: t('how.s1t'), desc: t('how.s1d') },
    { icon: MessageSquare, title: t('how.s2t'), desc: t('how.s2d') },
    { icon: Compass, title: t('how.s3t'), desc: t('how.s3d') },
    { icon: ListChecks, title: t('how.s4t'), desc: t('how.s4d') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950">
        <img
          src={heroImg}
          alt="University of Bisha campus"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/45 via-navy-950/55 to-navy-950/92" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
        <img
          src={emblem}
          alt=""
          aria-hidden="true"
          className="absolute -top-10 ltr:-right-16 rtl:-left-16 w-[420px] opacity-[0.06] pointer-events-none select-none"
        />
        <div className="relative max-w-content mx-auto px-5 sm:px-8 pt-20 pb-28 text-center animate-fade-in-up">
          <p className="inline-block text-xs font-bold tracking-wide uppercase text-teal-400 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            {t('hero.eyebrow')}
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-[1.1] max-w-3xl mx-auto">
            {t('hero.title')}
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mt-6 leading-relaxed">
            {t('hero.sub')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9">
            <Button variant="accent" size="lg" onClick={() => goToApp('/app/dashboard')}>
              {isAuthenticated ? L(DASHBOARD_LABEL) : t('hero.cta1')}
              <ArrowRight size={18} className="rtl-flip" />
            </Button>
            <Button variant="outline" size="lg" as="a" href="#services">
              {t('hero.cta2')}
            </Button>
          </div>
        </div>
      </section>

      {/* SMART CAMPUS FEATURES */}
      <section className="bg-sand-50 py-20">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-xs font-bold tracking-wide uppercase text-teal-600 mb-3">{t('smart.kicker')}</p>
            <h2 className="text-2xl sm:text-4xl text-ink-900 mb-4">{t('smart.title')}</h2>
            <p className="text-ink-500 leading-relaxed">{t('smart.sub')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <Card key={f.title} className="p-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <span className="w-11 h-11 rounded-md bg-navy-700/10 text-navy-700 flex items-center justify-center mb-4">
                  <f.icon size={20} strokeWidth={2} />
                </span>
                <h3 className="text-base font-bold text-ink-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-surface py-20 border-y border-line-soft overflow-hidden">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-xs font-bold tracking-wide uppercase text-teal-600 mb-3">{t('how.kicker')}</p>
            <h2 className="text-2xl sm:text-4xl text-ink-900">{t('how.title')}</h2>
          </div>

          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
            {/* Connecting line threading through the step numbers (desktop only) */}
            <div
              className="hidden lg:block absolute top-7 h-0.5 bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0"
              style={{ left: '12.5%', right: '12.5%' }}
              aria-hidden="true"
            />

            {steps.map((s, i) => (
              <div
                key={s.title}
                className="relative flex flex-col items-center text-center lg:items-start lg:text-start animate-fade-in-up"
                style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'both' }}
              >
                <div className="relative z-10 w-14 h-14 rounded-full bg-navy-900 text-white flex items-center justify-center font-extrabold text-lg ring-8 ring-white shadow-md mb-5">
                  {i + 1}
                </div>
                <Card className="p-5 w-full bg-sand-50 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <span className="w-10 h-10 rounded-md bg-teal-500/10 text-teal-600 flex items-center justify-center mb-3.5 mx-auto lg:mx-0">
                    <s.icon size={18} strokeWidth={2} />
                  </span>
                  <h3 className="text-base font-bold text-ink-900 mb-1.5">{s.title}</h3>
                  <p className="text-sm text-ink-500 leading-relaxed">{s.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI PREVIEW */}
      <section id="ai" className="bg-navy-900 py-20">
        <div className="max-w-content mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold tracking-wide uppercase text-teal-400 mb-3">{t('aiprev.kicker')}</p>
            <h2 className="text-2xl sm:text-3xl text-white mb-5 leading-tight">{t('aiprev.title')}</h2>
            <div className="space-y-4">
              {[
                { h: t('aiprev.r1h'), p: t('aiprev.r1p'), icon: CheckCircle2 },
                { h: t('aiprev.r2h'), p: t('aiprev.r2p'), icon: FileText },
                { h: t('aiprev.r3h'), p: t('aiprev.r3p'), icon: ListOrdered },
              ].map((r) => (
                <div key={r.h} className="flex items-start gap-3">
                  <r.icon size={18} className="text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white">{r.h}</p>
                    <p className="text-xs text-white/60">{r.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Card className="p-6 sm:p-7">
            <div className="flex items-start gap-3 mb-5">
              <span className="w-9 h-9 rounded-full bg-sand-100 flex items-center justify-center shrink-0 text-sm font-bold text-ink-700">
                {t('login.uniAccount')[0]}
              </span>
              <div className="bg-sand-100 rounded-lg rounded-ss-sm px-4 py-3 text-sm text-ink-900 max-w-[85%]">
                {t('aiprev.q')}
              </div>
            </div>
            <div className="flex items-start gap-3 flex-row-reverse">
              <span className="w-9 h-9 rounded-full bg-navy-700 flex items-center justify-center shrink-0">
                <Sparkles size={16} className="text-teal-400" />
              </span>
              <div className="bg-navy-700 text-white rounded-lg rounded-se-sm px-4 py-3 text-sm max-w-[85%] leading-relaxed">
                {t('aiprev.a')}
              </div>
            </div>
            <Button
              variant="accent"
              size="sm"
              className="mt-5 w-full"
              onClick={() => (isAuthenticated ? navigate('/app/ai') : navigate('/login', { state: { from: '/app/ai' } }))}
            >
              {t('aiprev.cta')}
            </Button>
          </Card>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section id="services" className="bg-sand-50 py-20">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-xs font-bold tracking-wide uppercase text-teal-600 mb-3">{t('svcsec.kicker')}</p>
            <h2 className="text-2xl sm:text-4xl text-ink-900">{t('svcsec.title')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.slice(0, 8).map((s) => {
              const Icon = SERVICE_ICONS[s.icon] || FileText;
              return (
                <Card
                  key={s.id}
                  className="p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                  onClick={() =>
                    isAuthenticated
                      ? navigate(`/app/services/${s.id}`)
                      : navigate('/login', { state: { from: `/app/services/${s.id}` } })
                  }
                >
                  <span className="w-10 h-10 rounded-md bg-teal-500/10 text-teal-600 flex items-center justify-center mb-3.5">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <h3 className="text-sm font-bold text-ink-900 mb-1">{L(s.name)}</h3>
                  <p className="text-xs text-ink-500 flex items-center gap-1">
                    <Clock size={12} /> {L(s.time)}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* NOTIFICATIONS PREVIEW */}
      <section className="bg-surface py-20 border-t border-line-soft">
        <div className="max-w-content mx-auto px-5 sm:px-8 text-center max-w-xl">
          <p className="text-xs font-bold tracking-wide uppercase text-teal-600 mb-3">{t('notifsec.kicker')}</p>
          <h2 className="text-2xl sm:text-3xl text-ink-900 mb-4">{t('notifsec.title')}</h2>
          <p className="text-ink-500 leading-relaxed mb-8">{t('notifsec.sub')}</p>
          <Button variant="primary" size="lg" onClick={() => goToApp('/app/dashboard')}>
            {isAuthenticated ? L(DASHBOARD_LABEL) : t('nav.enter')}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
