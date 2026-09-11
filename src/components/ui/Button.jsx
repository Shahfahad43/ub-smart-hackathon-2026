const VARIANTS = {
  primary: 'bg-navy-700 text-white hover:bg-navy-800 shadow-sm',
  accent: 'bg-teal-500 text-navy-900 hover:bg-teal-400 shadow-sm',
  secondary: 'bg-white text-navy-800 border border-line hover:border-navy-600 hover:bg-sand-100',
  ghost: 'bg-transparent text-navy-800 hover:bg-sand-100',
  outline: 'bg-transparent text-white border border-white/40 hover:bg-white/10',
};

const SIZES = {
  sm: 'text-sm px-3.5 py-2 gap-1.5',
  md: 'text-sm px-5 py-2.5 gap-2',
  lg: 'text-base px-6 py-3.5 gap-2',
};

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center font-semibold rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
        VARIANTS[variant] || VARIANTS.primary
      } ${SIZES[size] || SIZES.md} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
