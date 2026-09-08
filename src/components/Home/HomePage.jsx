import { useNavigate } from 'react-router-dom';
import './HomePage.css';

/**
 * 1Fi Home page — landing page with key value propositions and CTA to shop
 */
export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="home-hero">
        <div className="hero-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
          </svg>
          No-cost EMIs backed by Mutual Funds
        </div>
        <h1 className="hero-title">
          <span className="hero-title-bold">Shop today</span>
          <br />
          <span className="hero-title-light">Pay later</span>{' '}
          <span className="hero-title-bold">using</span>
          <br />
          <span className="hero-title-gradient">mutual funds.</span>
        </h1>
        <p className="hero-subtitle">
          No <strong>credit</strong> score required. No <strong>interest.</strong>
          <br />
          Fully backed by your <strong>investments</strong>.
        </p>
        <button className="hero-cta" onClick={() => navigate('/shop')}>
          Start Shopping
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Features */}
      <div className="home-features">
        <FeatureCard
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
          }
          title="Instant Approvals"
          description="Get your credit limit in minutes"
        />
        <FeatureCard
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          }
          title="0% Interest"
          description="No-cost EMIs on all products"
        />
        <FeatureCard
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 7h6v6" />
              <path d="m22 7-8.5 8.5-5-5L2 17" />
            </svg>
          }
          title="Keep Earning"
          description="Your investments continue growing"
        />
      </div>

      {/* How it works */}
      <div className="home-steps">
        <h2 className="steps-title">How it works</h2>
        <div className="steps-list">
          <Step number="01" title="Choose Product" desc="Browse & pick your favourite device" />
          <Step number="02" title="Select EMI Plan" desc="Choose a tenure that suits you" />
          <Step number="03" title="Pledge Funds" desc="Use your mutual funds as collateral" />
          <Step number="04" title="Get Delivered" desc="Complete purchase, enjoy your product" />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="home-bottom-cta">
        <button className="bottom-cta-btn" onClick={() => navigate('/shop')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Browse Marketplace
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="step-item">
      <span className="step-number">{number}</span>
      <div className="step-content">
        <h4 className="step-title">{title}</h4>
        <p className="step-desc">{desc}</p>
      </div>
    </div>
  );
}
