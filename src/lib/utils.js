export function genRequestId() {
  const n = Math.floor(100000 + Math.random() * 899999);
  return 'UB-2026-' + n;
}

// Maps a request status to its translation key, pill color, and icon name.
export const STATUS_META = {
  submitted: { label: 'tracker.submitted', pill: 'info', icon: 'Send' },
  review: { label: 'tracker.review', pill: 'warning', icon: 'Search' },
  verification: { label: 'tracker.verification', pill: 'warning', icon: 'Building2' },
  actionRequired: { label: 'tracker.actionRequired', pill: 'danger', icon: 'AlertTriangle' },
  approved: { label: 'tracker.approved', pill: 'success', icon: 'Check' },
  rejected: { label: 'tracker.rejected', pill: 'danger', icon: 'X' },
  completed: { label: 'tracker.completed', pill: 'success', icon: 'CheckCheck' },
};

export function statusMeta(status) {
  return STATUS_META[status] || STATUS_META.submitted;
}

export function gradeColor(g) {
  if (g.startsWith('A')) return '#1E8F5F';
  if (g.startsWith('B')) return '#2563A8';
  if (g.startsWith('C')) return '#B4740F';
  return '#C1352B';
}

export function levelColor(l) {
  return { success: '#1E8F5F', warning: '#B4740F', error: '#C1352B', info: '#2563A8' }[l] || '#2563A8';
}

export function greetingKey() {
  const h = new Date().getHours();
  if (h < 12) return 'greeting.morning';
  if (h < 18) return 'greeting.afternoon';
  return 'greeting.evening';
}

// Tailwind class fragments for each semantic pill color, kept in one place
// so every badge/status chip in the app stays visually consistent.
export const PILL_CLASSES = {
  info: 'bg-info-bg text-info',
  warning: 'bg-warning-bg text-warning',
  danger: 'bg-danger-bg text-danger',
  success: 'bg-success-bg text-success',
};
