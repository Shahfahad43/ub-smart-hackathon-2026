import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import logo from '../../assets/logo.png';

export default function Footer() {
  const { t, toggleLang } = useLanguage();

  const col2 = [
    { label: t('footer.home'), to: '/' },
    { label: t('footer.login'), to: '/login' },
    { label: t('footer.ai'), to: '/login' },
  ];
  const col3 = [
    { label: t('footer.svcAcademic') },
    { label: t('footer.svcHousing') },
    { label: t('footer.svcGrad') },
  ];
  const col4 = [{ label: t('footer.privacy') }, { label: t('footer.terms') }, { label: t('footer.contact') }];

  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-content mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="bg-white inline-flex rounded-md p-2.5 mb-4">
            <img src={logo} alt="University of Bisha" className="h-8 w-auto" />
          </div>
          <p className="text-sm text-white/70 leading-relaxed max-w-xs">{t('footer.desc')}</p>
          <p className="text-xs text-teal-400 font-semibold mt-3">{t('footer.tag')}</p>
        </div>

        <FooterCol title={t('footer.links')} items={col2} />
        <FooterCol title={t('footer.services')} items={col3} />
        <FooterCol title={t('footer.support')} items={col4} />
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50 text-center sm:text-start">{t('footer.copyright')}</p>
          <button onClick={toggleLang} className="text-xs font-semibold text-white/70 hover:text-white">
            {t('footer.lang')}: {t('footer.switch')}
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-white mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((it) =>
          it.to ? (
            <li key={it.label}>
              <Link to={it.to} className="text-sm text-white/70 hover:text-white transition-colors">
                {it.label}
              </Link>
            </li>
          ) : (
            <li key={it.label} className="text-sm text-white/70">
              {it.label}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
