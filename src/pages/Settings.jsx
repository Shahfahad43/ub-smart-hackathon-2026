import { useLanguage } from '../context/LanguageContext';
import { useAppState } from '../context/AppStateContext';
import { Card } from '../components/ui/Card';

export default function Settings() {
  const { t, lang, setLang } = useLanguage();
  const { settings, updateSettings, showToast } = useAppState();

  const toggle = (key) => updateSettings({ [key]: !settings[key] });

  const setFontSize = (sz) => {
    updateSettings({ fontSize: sz });
    showToast(t('settings.fontSize'), 'Text');
  };

  const setTheme = (th) => {
    updateSettings({ theme: th });
    showToast(t('settings.theme'), 'Palette');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl text-ink-900">{t('settings.title')}</h1>
        <p className="text-sm text-ink-500 mt-1">{t('settings.sub')}</p>
      </div>

      <div className="max-w-2xl space-y-5">
        <Card className="p-6">
          <h3 className="text-base font-bold text-ink-900 mb-4">{t('settings.language')}</h3>
          <SettingsRow label={t('settings.language')} hint="English / العربية">
            <SegControl
              options={[
                { key: 'en', label: 'English' },
                { key: 'ar', label: 'العربية' },
              ]}
              active={lang}
              onChange={setLang}
            />
          </SettingsRow>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-bold text-ink-900 mb-1">{t('settings.notifications')}</h3>
          <ToggleRow label={t('settings.emailNotif')} on={settings.email} onClick={() => toggle('email')} />
          <ToggleRow label={t('settings.pushNotif')} on={settings.push} onClick={() => toggle('push')} />
          <ToggleRow label={t('settings.academicAlerts')} on={settings.academic} onClick={() => toggle('academic')} />
          <ToggleRow label={t('settings.serviceUpdates')} on={settings.service} onClick={() => toggle('service')} last />
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-bold text-ink-900 mb-1">{t('settings.accessibility')}</h3>
          <SettingsRow label={t('settings.fontSize')}>
            <SegControl
              options={[
                { key: 'small', label: t('settings.small') },
                { key: 'medium', label: t('settings.medium') },
                { key: 'large', label: t('settings.large') },
              ]}
              active={settings.fontSize}
              onChange={setFontSize}
            />
          </SettingsRow>
          <ToggleRow label={t('settings.reducedMotion')} on={settings.reducedMotion} onClick={() => toggle('reducedMotion')} last />
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-bold text-ink-900 mb-1">{t('settings.theme')}</h3>
          <SettingsRow label={t('settings.theme')}>
            <SegControl
              options={[
                { key: 'light', label: t('settings.light') },
                { key: 'dark', label: t('settings.dark') },
                { key: 'system', label: t('settings.system') },
              ]}
              active={settings.theme}
              onChange={setTheme}
            />
          </SettingsRow>
        </Card>
      </div>
    </div>
  );
}

function SettingsRow({ label, hint, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 border-t border-line-soft first:border-t-0 flex-wrap">
      <div>
        <strong className="text-sm text-ink-900">{label}</strong>
        {hint && <p className="text-xs text-ink-500 mt-0.5">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ label, on, onClick, last }) {
  return (
    <div className={`flex items-center justify-between py-3.5 ${!last ? 'border-b border-line-soft' : ''}`}>
      <strong className="text-sm text-ink-900">{label}</strong>
      <button
        onClick={onClick}
        className={`w-11 h-6 rounded-full relative shrink-0 transition-colors duration-200 ${on ? 'bg-teal-500' : 'bg-sand-200'}`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-0.5 start-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            on ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

function SegControl({ options, active, onChange }) {
  return (
    <div className="inline-flex bg-sand-100 rounded-md p-1">
      {options.map((o) => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          className={`text-xs font-semibold px-3.5 py-1.5 rounded transition-colors ${
            active === o.key ? 'bg-surface text-navy-800 shadow-sm' : 'text-ink-500'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
