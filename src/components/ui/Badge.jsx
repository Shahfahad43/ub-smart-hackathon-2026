import { PILL_CLASSES } from '../../lib/utils';

export default function Badge({ tone = 'info', children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        PILL_CLASSES[tone] || PILL_CLASSES.info
      } ${className}`}
    >
      {children}
    </span>
  );
}
