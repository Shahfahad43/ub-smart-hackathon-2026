import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { Card } from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import { STUDENTS } from '../data/students';

export default function Profile() {
  const { t, L } = useLanguage();
  const { student, switchProfile } = useAuth();
  const { showToast } = useAppState();
  const navigate = useNavigate();
  const [email, setEmail] = useState(student?.email || '');
  const [phone, setPhone] = useState(student?.phone || '');

  if (!student) return null;

  const fields = [
    { label: t('profile.college'), value: L(student.college) },
    { label: t('profile.department'), value: L(student.department) },
    { label: t('profile.program'), value: L(student.program) },
    { label: t('profile.level'), value: student.level },
    { label: t('profile.gpa'), value: `${student.gpa.toFixed(2)} / 5` },
    { label: t('profile.standing'), value: L(student.standing) },
    { label: t('profile.advisor'), value: L(student.advisor) },
    { label: t('profile.graduation'), value: student.gradYear },
  ];

  const handleSwitch = (key) => {
    switchProfile(key);
    showToast(t('common.demoNotice'), 'RefreshCcw');
    navigate('/app/dashboard');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl text-ink-900">{t('profile.title')}</h1>
        <p className="text-sm text-ink-500 mt-1">{t('profile.sub')}</p>
      </div>

      <Card className="p-6 flex items-center gap-4 mb-5">
        <Avatar src={student.avatar} initials={student.initials} size={64} className="text-xl" />
        <div>
          <h2 className="text-lg font-bold text-ink-900">{L(student.name)}</h2>
          <p className="text-sm text-ink-500">
            {student.studentId} · {L(student.program)} · {t('stat.level')} {student.level}
          </p>
        </div>
      </Card>

      <Card className="p-6 mb-5">
        <div className="grid sm:grid-cols-2 gap-5">
          {fields.map((f) => (
            <div key={f.label}>
              <p className="text-xs font-bold text-ink-500 mb-1">{f.label}</p>
              <p className="text-sm font-semibold text-ink-900">{f.value}</p>
            </div>
          ))}
          <div>
            <p className="text-xs font-bold text-ink-500 mb-1">{t('profile.email')}</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-sm font-semibold text-ink-900 bg-transparent border-b border-transparent hover:border-line focus:border-navy-500 outline-none w-full"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-ink-500 mb-1">{t('profile.phone')}</p>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-sm font-semibold text-ink-900 bg-transparent border-b border-transparent hover:border-line focus:border-navy-500 outline-none w-full"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-base font-bold text-ink-900 mb-4">{t('profile.switchDemo')}</h3>
        <div className="flex flex-wrap gap-3">
          {Object.values(STUDENTS).map((st) => (
            <button
              key={st.key}
              onClick={() => handleSwitch(st.key)}
              disabled={st.key === student.key}
              className={`flex-1 min-w-[200px] flex items-center gap-3 border rounded-md px-4 py-3 transition-colors text-start ${
                st.key === student.key
                  ? 'border-teal-500 bg-teal-100/40 cursor-default'
                  : 'border-line hover:border-navy-500 hover:bg-sand-100'
              }`}
            >
              <span className="w-9 h-9 rounded-full bg-navy-700 text-white font-bold flex items-center justify-center text-xs shrink-0">
                {st.initials}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-ink-900 truncate">{L(st.name)}</span>
                <span className="block text-xs text-ink-500 truncate">{L(st.program)}</span>
              </span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
