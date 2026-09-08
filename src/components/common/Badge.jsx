import './Badge.css';

/**
 * Reusable badge component matching 1Fi's tag style
 * @param {'default' | 'success' | 'accent' | 'outline'} variant
 */
export function Badge({ children, variant = 'default', size = 'sm' }) {
  return (
    <span className={`badge badge--${variant} badge--${size}`}>
      {children}
    </span>
  );
}
