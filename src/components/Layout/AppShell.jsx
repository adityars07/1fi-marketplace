import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Toast } from '../common/Toast';
import './AppShell.css';

/**
 * Mobile app shell with header and bottom navigation
 * Wraps all pages in a consistent app frame
 */
export function AppShell() {
  const location = useLocation();

  // Determine the page title from the current path
  const getTitle = () => {
    if (location.pathname.startsWith('/product/')) return 'Product Details';
    switch (location.pathname) {
      case '/': return 'Shop';
      case '/shop': return 'Shop';
      default: return '1Fi';
    }
  };

  const isDetailPage = location.pathname.startsWith('/product/');

  return (
    <div className="app-shell">
      {/* Status Bar Simulation */}
      <div className="status-bar">
        <span className="status-time">
          {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </span>
        <div className="status-icons">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>

      {/* Header */}
      {!isDetailPage && (
        <header className="app-header">
          <div className="header-left">
            <img src="https://1fi.in/1fi.svg" alt="1Fi" className="header-logo" />
          </div>
          <h1 className="header-title">{getTitle()}</h1>
          <div className="header-right">
            <button className="header-action" aria-label="Search">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`app-main ${isDetailPage ? 'app-main--no-header' : ''}`}>
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav" aria-label="Main navigation">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`} end>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </NavLink>

        <NavLink to="/shop" className={({ isActive }) => `nav-item ${isActive || location.pathname.startsWith('/product/') ? 'nav-item--active' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span>Shop</span>
        </NavLink>

        <div className="nav-item nav-item--disabled">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
          <span>Cards</span>
        </div>

        <div className="nav-item nav-item--disabled">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 1 0-16 0" />
          </svg>
          <span>Profile</span>
        </div>
      </nav>

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
}
