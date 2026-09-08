import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

/**
 * 1Fi Home Page — Pixel-accurate recreation of the 1Fi mobile app home screen
 * Features:
 * - "GET STARTED" Shop on no-cost EMI hero card with 3D 0% Interest graphic
 * - Offers carousel with MakeMyTrip European escape deal
 * - Top Brands logo strip (EaseMyTrip, Yatra, Taj, Apple, Reliance Digital)
 * - Why Pay With 1Fi benefit cards
 * - How 1Fi Works 3-step workflow
 * - Refer & Earn banner
 * - Frequently Asked Questions interactive accordion
 */
export function HomePage() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="home-screen">
      {/* 1. GET STARTED Hero Card */}
      <section className="home-hero-card">
        <div className="hero-content">
          <span className="hero-eyebrow">GET STARTED</span>
          <h1 className="hero-heading">
            Shop on <span className="hero-highlight-gold">no-cost EMI</span>
          </h1>
          <p className="hero-subtext">
            Backed by your mutual funds, No credit pull, No charges, & quick approval.
          </p>
          <button
            className="hero-eligibility-btn"
            onClick={() => navigate('/shop')}
            aria-label="Check eligibility and shop"
          >
            Check eligibility
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 3D 0% Interest Graphic with Confetti */}
        <div className="hero-graphic" aria-hidden="true">
          <div className="zero-interest-wrap">
            <span className="zero-number">0%</span>
            <span className="interest-text">INTEREST</span>
          </div>
          {/* Confetti / Sparkle Accents */}
          <span className="confetti conf-1" />
          <span className="confetti conf-2" />
          <span className="confetti conf-3" />
          <span className="confetti conf-4" />
          <span className="sparkle spark-1">✦</span>
          <span className="sparkle spark-2">✦</span>
        </div>
      </section>

      {/* 2. OFFERS Section */}
      <section className="home-section">
        <div className="section-title-wrap">
          <span className="section-indicator-bar" />
          <h2 className="section-title">OFFERS</h2>
        </div>

        <div className="offers-carousel" onClick={() => navigate('/shop')}>
          <div className="offer-card">
            <div className="offer-badge-tag">HOLIDAY VOUCHER DEAL</div>
            <div className="offer-partner-logo">
              <span className="mmt-text">make<span className="mmt-my">my</span>trip</span>
            </div>
            <h3 className="offer-title">
              Book Your Euro-phoric<br />Escape with 1Fi
            </h3>
            <div className="offer-emi-pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Starts at ₹2,481/mo</span>
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="carousel-dots" aria-hidden="true">
            <span className="dot dot--active" />
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      </section>

      {/* 3. SHOP USING 1FI AT TOP BRANDS */}
      <section className="home-section">
        <div className="section-title-wrap">
          <span className="section-indicator-bar" />
          <h2 className="section-title">SHOP USING 1FI AT TOP BRANDS</h2>
        </div>

        <div className="brand-strip">
          <div className="brand-item" onClick={() => navigate('/shop')}>
            <div className="brand-card">
              <span className="brand-logo-emt">EaseMyTrip<span className="emt-plane">✈</span></span>
            </div>
            <span className="brand-name">EaseMyTrip</span>
          </div>

          <div className="brand-item" onClick={() => navigate('/shop')}>
            <div className="brand-card">
              <span className="brand-logo-yatra">yatra</span>
            </div>
            <span className="brand-name">Yatra</span>
          </div>

          <div className="brand-item" onClick={() => navigate('/shop')}>
            <div className="brand-card">
              <div className="brand-logo-taj">
                <span className="taj-crest">❖</span>
                <span className="taj-text">TAJ</span>
              </div>
            </div>
            <span className="brand-name">Taj</span>
          </div>

          <div className="brand-item" onClick={() => navigate('/shop')}>
            <div className="brand-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.6-0.74 1.01-1.77.9-2.8-.88.04-1.94.59-2.57 1.33-.56.64-1.05 1.68-.92 2.69 1 .08 1.99-.48 2.59-1.22z"/>
              </svg>
            </div>
            <span className="brand-name">Apple</span>
          </div>

          <div className="brand-item" onClick={() => navigate('/shop')}>
            <div className="brand-card">
              <span className="brand-logo-reliance">reliance<span className="rel-digital">digital</span></span>
            </div>
            <span className="brand-name">Reliance</span>
          </div>
        </div>
      </section>

      {/* 4. WHY PAY WITH 1FI */}
      <section className="home-section">
        <div className="section-title-wrap">
          <span className="section-indicator-bar" />
          <h2 className="section-title">WHY PAY WITH 1FI</h2>
        </div>

        <div className="benefits-row">
          <div className="benefit-card">
            <div className="benefit-icon-box icon-purple">
              <span>%</span>
            </div>
            <div className="benefit-info">
              <h3 className="benefit-title">0% interest</h3>
              <p className="benefit-desc">Repay only what you spend.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box icon-purple-light">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C28D9" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div className="benefit-info">
              <h3 className="benefit-title">Zero charges</h3>
              <p className="benefit-desc">No fees, nothing hidden.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box icon-blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <div className="benefit-info">
              <h3 className="benefit-title">Quickest approval</h3>
              <p className="benefit-desc">Instant eligibility check.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW 1FI WORKS */}
      <section className="home-section">
        <div className="section-title-wrap">
          <span className="section-indicator-bar" />
          <h2 className="section-title">HOW 1FI WORKS</h2>
        </div>

        <div className="workflow-card">
          <div className="workflow-steps">
            {/* Step 1 */}
            <div className="step-item">
              <div className="step-circle-wrap">
                <div className="step-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
                    <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <span className="step-badge">1</span>
              </div>
              <span className="step-label">CONNECT YOUR PORTFOLIO</span>
            </div>

            <div className="step-connector" />

            {/* Step 2 */}
            <div className="step-item">
              <div className="step-circle-wrap">
                <div className="step-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <span className="step-badge">2</span>
              </div>
              <span className="step-label">UNLOCK YOUR LIMIT</span>
            </div>

            <div className="step-connector" />

            {/* Step 3 */}
            <div className="step-item">
              <div className="step-circle-wrap">
                <div className="step-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <span className="step-badge">3</span>
              </div>
              <span className="step-label">SHOP &amp; PAY LATER</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REFER AND EARN */}
      <section className="home-section">
        <div className="refer-banner">
          <div className="refer-content">
            <div className="refer-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>INVITE</span>
            </div>
            <h3 className="refer-title">
              Get <span className="refer-gold">upto ₹1000</span> for every friend.
            </h3>
            <p className="refer-subtitle">Plus they'll also get rewards.</p>
          </div>

          <div className="refer-3d-text" aria-hidden="true">
            <div className="refer-3d-inner">
              <span className="r3d-refer">REFER</span>
              <span className="r3d-and">AND</span>
              <span className="r3d-earn">EARN</span>
            </div>
            <span className="confetti conf-gold-1" />
            <span className="confetti conf-gold-2" />
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="home-section home-section--last">
        <div className="section-title-wrap">
          <span className="section-indicator-bar" />
          <h2 className="section-title">FREQUENTLY ASKED QUESTIONS</h2>
        </div>

        <div className="faq-card">
          <FaqItem
            question="What is 1Fi?"
            answer="1Fi is India's premier financial platform that lets you shop on 0% No-Cost EMI backed by your mutual fund portfolio. Instead of selling your investments, pledge them securely to unlock an instant shopping credit limit."
            isOpen={activeFaq === 0}
            onClick={() => toggleFaq(0)}
          />
          <FaqItem
            question="Is 1Fi safe and legit?"
            answer="Yes, 1Fi works exclusively with RBI-approved banks and NBFC lending partners. Your mutual fund holdings stay securely deposited in your existing RTAs (CAMS / KFintech) under your ownership."
            isOpen={activeFaq === 1}
            onClick={() => toggleFaq(1)}
          />
          <FaqItem
            question="Who is the RBI approved lending partner?"
            answer="1Fi partners with leading RBI-registered NBFCs and scheduled commercial banks to provide credit facilities. All terms, sanctions, and agreements are 100% compliant with RBI digital lending guidelines."
            isOpen={activeFaq === 2}
            onClick={() => toggleFaq(2)}
          />
          <FaqItem
            question="What documents are needed to take a loan?"
            answer="No physical documentation or salary slips are required. You only need your PAN, Aadhaar for digital e-KYC, and mobile number registered with your mutual fund folio."
            isOpen={activeFaq === 3}
            onClick={() => toggleFaq(3)}
          />
          <FaqItem
            question="Are there any hidden fees?"
            answer="Zero hidden fees. We offer 100% transparent pricing. No-Cost EMI plans feature 0% interest, and any nominal one-time processing fee is clearly displayed before you submit."
            isOpen={activeFaq === 4}
            onClick={() => toggleFaq(4)}
          />
        </div>
      </section>
    </div>
  );
}

function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className={`faq-row ${isOpen ? 'faq-row--open' : ''}`}>
      <button className="faq-question-btn" onClick={onClick} aria-expanded={isOpen}>
        <span>{question}</span>
        <svg
          className="faq-chevron"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6B7280"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
