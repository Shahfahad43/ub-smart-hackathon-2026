// Circular avatar: shows a photo when `src` is provided, otherwise falls
// back to initials on a solid background. Used for student profile pictures
// throughout the app (sidebar, topbar, login picker, profile page).
export default function Avatar({ src, initials, size = 40, className = '', ringClassName = '' }) {
  const px = `${size}px`;
  if (src) {
    return (
      <img
        src={src}
        alt={initials || 'avatar'}
        style={{ width: px, height: px }}
        className={`rounded-full object-cover shrink-0 ${ringClassName} ${className}`}
      />
    );
  }
  return (
    <span
      style={{ width: px, height: px }}
      className={`rounded-full bg-navy-700 text-white font-bold flex items-center justify-center shrink-0 ${className}`}
    >
      {initials}
    </span>
  );
}
