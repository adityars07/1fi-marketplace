import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Toast } from '../common/Toast';
import './AppShell.css';

/**
 * Mobile app shell faithfully matching the 1Fi mobile application
 * Floating bottom navigation (Home, Shop, EMI Dues, Limit, Profile)
 * Status bar with 5G, VoLTE, and 84% battery
 */
export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSheet, setActiveSheet] = useState(null);

  // Auto-scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isShopPage = location.pathname === '/shop';
  const isDetailPage = location.pathname.startsWith('/product/');

  const handleNavTabClick = (tabId, path) => {
    if (path) {
      setActiveSheet(null);
      navigate(path);
    } else {
      setActiveSheet(tabId);
    }
  };

  return (
    <div className={`app-shell ${isShopPage ? 'app-shell--dark-status' : ''}`}>
      {/* 1Fi Mobile Status Bar */}
      <div className={`status-bar ${isShopPage ? 'status-bar--dark' : ''}`}>
        <div className="status-left">
          <span className="status-time">10:18</span>
          <span className="status-notif-dot" aria-hidden="true" />
        </div>
        <div className="status-right">
          <span className="status-volte">Vo<span className="volte-sub">LTE</span></span>
          <span className="status-5g">5G</span>
          <div className="status-signal">
            <span className="sig-bar sig-bar-1" />
            <span className="sig-bar sig-bar-2" />
            <span className="sig-bar sig-bar-3" />
            <span className="sig-bar sig-bar-4" />
          </div>
          <div className="status-battery" title="84% battery">
            <div className="battery-level" style={{ width: '84%' }} />
            <span className="battery-text">84</span>
          </div>
        </div>
      </div>

      {/* Main Page Content */}
      <main className="app-main">
        <Outlet />
      </main>

      {/* Floating Modal for non-core tabs */}
      {activeSheet && (
        <div className="tab-sheet-backdrop" onClick={() => setActiveSheet(null)}>
          <div className="tab-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="tab-sheet-handle" />
            <div className="tab-sheet-header">
              <h3>{activeSheet === 'emi' ? 'EMI Dues' : activeSheet === 'limit' ? 'Credit Limit' : 'Profile & Settings'}</h3>
              <button className="tab-sheet-close" onClick={() => setActiveSheet(null)}>✕</button>
            </div>
            <div className="tab-sheet-body">
              {activeSheet === 'emi' && (
                <div className="sheet-content">
                  <div className="sheet-icon-circle">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6C28D9" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <h4>No Active Dues</h4>
                  <p>When you purchase products via 1Fi Marketplace, your upcoming monthly EMI installments will appear here.</p>
                  <button className="sheet-btn" onClick={() => { setActiveSheet(null); navigate('/shop'); }}>Browse 1Fi Marketplace</button>
                </div>
              )}
              {activeSheet === 'limit' && (
                <div className="sheet-content">
                  <div className="sheet-icon-circle">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6C28D9" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                  </div>
                  <h4>₹5,00,000 Approved Limit</h4>
                  <p>Backed by your mutual fund portfolio. Use your limit instantly for 0% No-Cost EMI purchases.</p>
                  <button className="sheet-btn" onClick={() => { setActiveSheet(null); navigate('/shop'); }}>Shop with your Limit</button>
                </div>
              )}
              {activeSheet === 'profile' && (
                <div className="sheet-content">
                  <div className="sheet-icon-circle">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6C28D9" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <h4>Aditya RS</h4>
                  <p className="profile-phone">+91 98765 43210 • KYC Verified</p>
                  <div className="profile-badge">RBI Compliant Account</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating 5-Item Bottom Navigation */}
      {!isDetailPage && (
        <nav className="bottom-nav" aria-label="Main navigation">
        {/* 1. Home */}
        <NavLink
          to="/"
          className={({ isActive }) => `nav-item ${isActive && !isDetailPage ? 'nav-item--active' : ''}`}
          end
          onClick={() => setActiveSheet(null)}
        >
          <div className="nav-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span>Home</span>
        </NavLink>

        {/* 2. Shop */}
        <NavLink
          to="/shop"
          className={({ isActive }) => `nav-item ${isActive || isDetailPage ? 'nav-item--active' : ''}`}
          onClick={() => setActiveSheet(null)}
        >
          <div className="nav-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l1.5-5h15L21 9" />
              <path d="M3 9v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9" />
              <path d="M9 22V12h6v10" />
            </svg>
          </div>
          <span>Shop</span>
        </NavLink>

        {/* 3. EMI Dues */}
        <button
          type="button"
          className={`nav-item ${activeSheet === 'emi' ? 'nav-item--active' : ''}`}
          onClick={() => handleNavTabClick('emi')}
        >
          <div className="nav-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <path d="M9 8h6" />
              <path d="M9 12h6" />
              <path d="M9 16h3" />
            </svg>
          </div>
          <span>EMI Dues</span>
        </button>

        {/* 4. Limit */}
        <button
          type="button"
          className={`nav-item ${activeSheet === 'limit' ? 'nav-item--active' : ''}`}
          onClick={() => handleNavTabClick('limit')}
        >
          <div className="nav-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <span>Limit</span>
        </button>

        {/* 5. Profile */}
        <button
          type="button"
          className={`nav-item ${activeSheet === 'profile' ? 'nav-item--active' : ''}`}
          onClick={() => handleNavTabClick('profile')}
        >
          <div className="nav-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <span>Profile</span>
        </button>
      </nav>
      )}

      {/* Global Toast */}
      <Toast />
    </div>
  );
}
