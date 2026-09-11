import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('ub-lang') || 'en');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('ub-lang', lang);
    } catch {
      /* storage unavailable — non-fatal in this demo */
    }
  }, [lang]);

  const setLang = useCallback((next) => setLangState(next), []);
  const toggleLang = useCallback(() => setLangState((l) => (l === 'ar' ? 'en' : 'ar')), []);

  // t(key, vars) — looks up the current language, falls back to English, then the raw key.
  const t = useCallback(
    (key, vars) => {
      let s = (translations[lang] && translations[lang][key]) || translations.en[key] || key;
      if (vars) {
        Object.keys(vars).forEach((k) => {
          s = s.replace('{' + k + '}', vars[k]);
        });
      }
      return s;
    },
    [lang]
  );

  // L(obj) — resolves a {en, ar} bilingual field to the current language's string.
  const L = useCallback(
    (obj) => {
      if (obj == null) return '';
      return typeof obj === 'object' ? obj[lang] || obj.en : obj;
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t, L, dir: lang === 'ar' ? 'rtl' : 'ltr', isRtl: lang === 'ar' }),
    [lang, setLang, toggleLang, t, L]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
