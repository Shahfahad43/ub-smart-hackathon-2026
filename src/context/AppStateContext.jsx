import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SEED_NOTIFICATIONS, SEED_REQUESTS, STAGES } from '../data/seed';
import { genRequestId } from '../lib/utils';

const AppStateContext = createContext(null);

// Demo-only: how fast a freshly submitted request "moves" through the
// tracker stages, so the prototype can show the full lifecycle in seconds
// instead of sitting at "Submitted" forever.
const DEMO_STAGE_DELAY_MS = 2200;

const STAGE_NOTIF_TEXT = {
  review: { en: 'is now under review.', ar: 'أصبح الآن قيد المراجعة.' },
  verification: { en: 'moved to department verification.', ar: 'انتقل إلى مرحلة التحقق من القسم.' },
  completed: { en: 'has been completed.', ar: 'تم إنجازه بالكامل.' },
};

// NOTE: This is an in-memory demo store (no backend, no localStorage for app
// data) — it intentionally resets on page reload, mirroring the original
// single-file prototype's behavior.
export function AppStateProvider({ children }) {
  const [requests, setRequests] = useState(SEED_REQUESTS);
  const [notifications, setNotifications] = useState(SEED_NOTIFICATIONS);
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    academic: true,
    service: false,
    fontSize: 'medium',
    reducedMotion: false,
    theme: 'light',
  });
  const [toast, setToast] = useState(null); // { msg, icon }
  const timersRef = useRef([]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  const showToast = useCallback((msg, icon = 'Bell') => {
    setToast({ msg, icon, key: Date.now() });
  }, []);

  // Demo-only progress simulation: steps a newly submitted request through
  // review -> verification -> completed automatically, posting a
  // notification (and a toast) at each stage so the full lifecycle is
  // visible within seconds without any backend.
  const simulateProgress = useCallback(
    (id) => {
      let idx = 0;
      const tick = () => {
        idx += 1;
        if (idx >= STAGES.length) return;
        const nextStatus = STAGES[idx];
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: nextStatus } : r)));
        const msg = STAGE_NOTIF_TEXT[nextStatus];
        setNotifications((prev) => [
          {
            id: Date.now() + Math.random(),
            cat: 'request',
            read: false,
            when: 'today',
            time: 'now',
            title: { en: `Request ${id} ${msg.en}`, ar: `الطلب ${id} ${msg.ar}` },
          },
          ...prev,
        ]);
        showToast(`${id} — ${msg.en}`, nextStatus === 'completed' ? 'CheckCheck' : 'Building2');
        if (idx < STAGES.length - 1) {
          timersRef.current.push(setTimeout(tick, DEMO_STAGE_DELAY_MS));
        }
      };
      timersRef.current.push(setTimeout(tick, DEMO_STAGE_DELAY_MS));
    },
    [showToast]
  );

  const submitRequest = useCallback(
    (payload) => {
      const id = genRequestId();
      const newRequest = {
        status: 'submitted',
        submitted: new Date().toISOString().slice(0, 10),
        department: { en: 'Admissions & Registration', ar: 'القبول والتسجيل' },
        expected: '',
        course: payload.course || '',
        reason: { en: payload.reason || '', ar: payload.reason || '' },
        ...payload,
        id, // generated id always wins over anything in payload
      };
      setRequests((prev) => [newRequest, ...prev]);
      setNotifications((prev) => [
        {
          id: Date.now(),
          cat: 'request',
          read: false,
          when: 'today',
          time: 'now',
          title: {
            en: `Your request ${id} has been submitted.`,
            ar: `تم إرسال طلبك ${id}.`,
          },
        },
        ...prev,
      ]);
      simulateProgress(id);
      return newRequest;
    },
    [simulateProgress]
  );

  const markRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const updateSettings = useCallback((patch) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const [isDark, setIsDark] = useState(false);

  // Flips between light/dark directly (used by the quick-access toggle
  // button in the topbar). The full Light/Dark/System control lives in
  // Settings and uses updateSettings({ theme }) directly.
  const toggleTheme = useCallback(() => {
    setSettings((prev) => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  }, []);

  // Accessibility settings (font size, reduced motion) are applied globally
  // via classes on <html>, matching the CSS rules defined in index.css.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-small', 'font-medium', 'font-large');
    root.classList.add(`font-${settings.fontSize}`);
    root.classList.toggle('reduced-motion', settings.reducedMotion);
  }, [settings.fontSize, settings.reducedMotion]);

  // Theme (light/dark/system) — toggles the .dark class Tailwind's
  // darkMode:'class' looks for, which in turn switches the CSS variables
  // defined in index.css (sand/ink/line/surface) that most of the app's
  // colors are built on. 'system' tracks the OS preference live.
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const apply = () => {
      const isDarkNow = settings.theme === 'dark' || (settings.theme === 'system' && media.matches);
      root.classList.toggle('dark', isDarkNow);
      setIsDark(isDarkNow);
    };

    apply();

    if (settings.theme === 'system') {
      media.addEventListener('change', apply);
      return () => media.removeEventListener('change', apply);
    }
  }, [settings.theme]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = useMemo(
    () => ({
      requests,
      submitRequest,
      notifications,
      unreadCount,
      markRead,
      markAllRead,
      settings,
      updateSettings,
      isDark,
      toggleTheme,
      toast,
      showToast,
    }),
    [requests, submitRequest, notifications, unreadCount, markRead, markAllRead, settings, updateSettings, isDark, toggleTheme, toast, showToast]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within an AppStateProvider');
  return ctx;
}
