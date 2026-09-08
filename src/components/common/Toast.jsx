import './Toast.css';
import { useEffect } from 'react';
import { useMarketplace, useMarketplaceDispatch } from '../../context/MarketplaceContext';

/**
 * Toast notification component for success/error messages
 */
export function Toast() {
  const { toast } = useMarketplace();
  const dispatch = useMarketplaceDispatch();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_TOAST' });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  return (
    <div className={`toast toast--${toast.type || 'success'}`} role="alert">
      <div className="toast-icon">
        {toast.type === 'error' ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        )}
      </div>
      <p className="toast-message">{toast.message}</p>
    </div>
  );
}
