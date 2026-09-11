import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertCircle, UploadCloud, Check, Send, Search, Building2, CheckCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { SERVICES } from '../data/services';

const NEEDS_COURSE = [];
const STAGES = ['submitted', 'review', 'verification', 'completed'];
const STAGE_ICONS = [Send, Search, Building2, CheckCheck];

export default function RequestForm() {
  const { id } = useParams();
  const { t, L, lang } = useLanguage();
  const { student } = useAuth();
  const { submitRequest, requests } = useAppState();
  const navigate = useNavigate();

  const s = SERVICES.find((x) => x.id === id);
  const needsCourse = NEEDS_COURSE.includes(id);

  const [course, setCourse] = useState('');
  const [reason, setReason] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [submittedId, setSubmittedId] = useState(null);

  if (!s || !student) return null;

  const handleSubmit = () => {
    const nextErrors = {};
    if (!reason.trim()) nextErrors.reason = true;
    if (needsCourse && !course) nextErrors.course = true;
    if (!confirm) nextErrors.confirm = true;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const created = submitRequest({
      serviceId: s.id,
      course,
      reason,
    });
    setSubmittedId(created.id);
  };

  if (submittedId) {
    const liveRequest = requests.find((r) => r.id === submittedId);
    const currentIdx = liveRequest ? STAGES.indexOf(liveRequest.status) : 0;
    const isDone = liveRequest?.status === 'completed';

    return (
      <div className="max-w-lg mx-auto">
        <Card className="p-10 text-center">
          <span className="w-16 h-16 rounded-full bg-success-bg text-success flex items-center justify-center mx-auto mb-5">
            <Check size={28} strokeWidth={2.5} />
          </span>
          <h2 className="text-xl font-bold text-navy-900 mb-2">{t('form.success.title')}</h2>
          <p className="text-sm text-ink-500 mb-6">{t('form.success.body')}</p>
          <div className="font-mono text-lg font-bold text-navy-800 bg-sand-100 rounded-md py-3 mb-6 tracking-wide">
            {submittedId}
          </div>

          {/* Live demo progress strip — mirrors what the Tracker page shows,
              advancing automatically every couple of seconds so the full
              lifecycle is visible right away. */}
          <div className="flex items-start mb-2">
            {STAGES.map((st, i) => {
              const Icon = STAGE_ICONS[i];
              const state = i < currentIdx ? 'done' : i === currentIdx ? 'current' : 'upcoming';
              const dotClasses = {
                done: 'bg-success text-white',
                current: 'bg-navy-700 text-white ring-4 ring-navy-700/15',
                upcoming: 'bg-sand-200 text-ink-300',
              }[state];
              return (
                <div key={st} className="flex-1 flex flex-col items-center relative">
                  {i > 0 && (
                    <div
                      className={`absolute top-4 h-0.5 w-full -translate-x-1/2 ${
                        i <= currentIdx ? 'bg-success' : 'bg-sand-200'
                      }`}
                      style={{ transform: 'translateX(-50%)' }}
                    />
                  )}
                  <span
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${dotClasses}`}
                  >
                    {state === 'current' && !isDone ? (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    ) : (
                      <Icon size={14} strokeWidth={2.5} />
                    )}
                  </span>
                  <span className="text-[10px] font-semibold text-ink-700 mt-2 text-center leading-tight">
                    {t('tracker.' + st)}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-ink-300 mb-6">
            {isDone
              ? t('tracker.completed')
              : lang === 'ar'
              ? 'نموذج توضيحي — يتقدّم الطلب تلقائياً للمحاكاة.'
              : 'Prototype demo — status advances automatically to simulate the full flow.'}
          </p>

          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            <Button variant="primary" onClick={() => navigate('/app/tracker')}>
              {t('form.success.track')}
            </Button>
            <Button variant="ghost" onClick={() => navigate('/app/services')}>
              {t('form.success.services')}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(`/app/services/${s.id}`)}
        className="flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-navy-700 mb-5"
      >
        <ArrowLeft size={15} className="rtl-flip" />
        {t('detail.back')}
      </button>

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl text-ink-900">{t('form.title')}</h1>
        <p className="text-sm text-ink-500 mt-1">{L(s.name)}</p>
      </div>

      <div className="max-w-xl space-y-5">
        <Card className="p-6">
          <h3 className="text-base font-bold text-ink-900 mb-4">{t('form.studentInfo')}</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Field label={t('form.name')}>
              <input className="form-input" value={L(student.name)} disabled />
            </Field>
            <Field label={t('form.id')}>
              <input className="form-input" value={student.studentId} disabled />
            </Field>
          </div>
          <Field label={t('form.college')}>
            <input className="form-input" value={L(student.college)} disabled />
          </Field>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-bold text-ink-900 mb-4">{L(s.name)}</h3>

          {needsCourse && (
            <Field label={t('form.course')} required error={errors.course}>
              <select
                className={`form-input ${errors.course ? 'border-danger' : ''}`}
                value={course}
                onChange={(e) => {
                  setCourse(e.target.value);
                  setErrors((p) => ({ ...p, course: false }));
                }}
              >
                <option value="">{t('form.selectCourse')}</option>
                {student.courses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          )}

          <Field label={t('form.reason')} required error={errors.reason}>
            <textarea
              rows={4}
              className={`form-input resize-none ${errors.reason ? 'border-danger' : ''}`}
              placeholder={t('form.reasonPh')}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setErrors((p) => ({ ...p, reason: false }));
              }}
            />
          </Field>

          <Field label={t('form.docs')}>
            <div className="border-2 border-dashed border-line rounded-md flex flex-col items-center justify-center gap-2 py-8 text-ink-500 text-sm text-center">
              <UploadCloud size={26} />
              {t('form.uploadHint')}
            </div>
          </Field>

          <label className="flex items-start gap-2.5 mt-5 cursor-pointer">
            <input
              type="checkbox"
              checked={confirm}
              onChange={(e) => {
                setConfirm(e.target.checked);
                setErrors((p) => ({ ...p, confirm: false }));
              }}
              className="mt-0.5 accent-teal-500 w-4 h-4"
            />
            <span className="text-sm text-ink-700 leading-relaxed">{t('form.confirm')}</span>
          </label>
          {errors.confirm && <ErrorLine text={t('form.required')} />}

          <Button variant="primary" className="w-full mt-6" onClick={handleSubmit}>
            {t('form.submit')}
          </Button>
        </Card>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          border: 1px solid #E4E1D8;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 14px;
          background: #fff;
          outline: none;
        }
        .form-input:focus { border-color: #2563A8; }
        .form-input:disabled { background: #F5F3EE; color: #66748A; }
      `}</style>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className="mb-4 last:mb-0">
      <label className="block text-xs font-bold text-ink-700 mb-1.5">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children}
      {error && <ErrorLine text="This field is required." />}
    </div>
  );
}

function ErrorLine({ text }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-danger mt-1.5">
      <AlertCircle size={13} />
      {text}
    </div>
  );
}
