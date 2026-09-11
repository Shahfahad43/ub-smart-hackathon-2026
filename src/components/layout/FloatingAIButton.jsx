import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ASSISTANT_NAME, ASSISTANT_AVATAR } from '../../lib/assistant';

// Makes the AI Service Navigator unmistakably reachable from anywhere inside
// the authenticated app — not just via the sidebar/bottom nav link — since
// it's the flagship feature of the prototype.
export default function FloatingAIButton() {
  const { L } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/app/ai') return null;

  return (
    <button
      onClick={() => navigate('/app/ai')}
      className="fixed z-40 bottom-20 md:bottom-6 ltr:right-5 rtl:left-5 flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white rounded-full pl-2 pr-5 rtl:pr-2 rtl:pl-5 py-2 shadow-lg transition-colors"
    >
      <img src={ASSISTANT_AVATAR} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-teal-500/50" />
      <span className="text-sm font-bold hidden sm:inline">{L(ASSISTANT_NAME)}</span>
    </button>
  );
}
