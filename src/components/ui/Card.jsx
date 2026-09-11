export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-surface border border-line-soft rounded-lg shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, tone = 'navy' }) {
  const toneClasses = {
    navy: 'bg-navy-700/10 text-navy-700',
    teal: 'bg-teal-500/15 text-teal-600',
  };
  return (
    <Card className="p-5 flex items-start gap-4">
      <span className={`w-11 h-11 rounded-md flex items-center justify-center shrink-0 ${toneClasses[tone]}`}>
        {Icon && <Icon size={20} strokeWidth={2} />}
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-extrabold text-ink-900 leading-tight">{value}</p>
        <p className="text-xs text-ink-500 mt-1">{label}</p>
      </div>
    </Card>
  );
}

export function EmptyState({ icon: Icon, title, body, action }) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6">
      <span className="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center mb-4">
        {Icon && <Icon size={28} strokeWidth={1.75} className="text-ink-300" />}
      </span>
      <h3 className="text-lg font-bold text-ink-900 mb-1.5">{title}</h3>
      <p className="text-sm text-ink-500 max-w-sm mb-5">{body}</p>
      {action}
    </div>
  );
}

export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-sand-200 rounded-md ${className}`} />;
}
