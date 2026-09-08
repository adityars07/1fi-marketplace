import { useState } from 'react';
import { ProductList } from '../Marketplace/ProductList';
import './ShopPage.css';

/**
 * Top Brands list matching Screenshot 3
 */
const TOP_BRANDS = [
  {
    id: 'air-india',
    name: 'Air India',
    emi: 'No-cost EMIs upto 18 months',
    color: '#E11900',
    logoType: 'airindia',
  },
  {
    id: 'apple-reseller',
    name: 'Apple Premium Reseller',
    emi: 'No-cost EMIs upto 24 months',
    color: '#000000',
    logoType: 'apple',
  },
  {
    id: 'caratlane',
    name: 'CaratLane',
    emi: 'No-cost EMIs upto 6 months',
    color: '#86198F',
    logoType: 'caratlane',
  },
  {
    id: 'easemytrip',
    name: 'EaseMyTrip',
    emi: 'No-cost EMIs upto 12 months',
    color: '#0284C7',
    logoType: 'easemytrip',
  },
  {
    id: 'taj-hotels',
    name: 'Taj Hotels & Resorts',
    emi: 'No-cost EMIs upto 12 months',
    color: '#B45309',
    logoType: 'taj',
  },
  {
    id: 'reliance-digital',
    name: 'Reliance Digital',
    emi: 'No-cost EMIs upto 24 months',
    color: '#1E3A8A',
    logoType: 'reliance',
  },
];

/**
 * Nearby stores list for the Nearby Stores tab
 */
const NEARBY_STORES = [
  {
    id: 'croma-bandra',
    name: 'Croma Electronics',
    location: 'Linking Road, Bandra West',
    distance: '0.8 km away',
    emi: 'No-cost EMIs upto 24 months',
    color: '#0D9488',
  },
  {
    id: 'apple-bkc',
    name: 'Apple BKC',
    location: 'Jio World Drive, BKC',
    distance: '1.4 km away',
    emi: 'No-cost EMIs upto 24 months',
    color: '#000000',
  },
  {
    id: 'reliance-juhu',
    name: 'Reliance Digital',
    location: 'Gulmohar Road, Juhu',
    distance: '2.1 km away',
    emi: 'No-cost EMIs upto 18 months',
    color: '#1E3A8A',
  },
  {
    id: 'vijay-sales',
    name: 'Vijay Sales',
    location: 'S.V. Road, Santacruz West',
    distance: '2.6 km away',
    emi: 'No-cost EMIs upto 12 months',
    color: '#DC2626',
  },
];

/**
 * 1Fi Shop Page — Pixel-accurate recreation of Screenshot 3
 * Features:
 * - Deep blue/purple hero banner with "✦ NO-COST EMIs", "Shop today, Pay later using Mutual funds."
 * - Floating 3D graphics (gadgets, car, bike, shopping bag with confetti)
 * - 3-Tab selector: Top Brands | Nearby Stores | 1Fi Marketplace
 * - Search bar ("Search online stores..." / "Search products...")
 * - Exact list of Top Brands cards
 * - Nearby offline stores with geo distance
 * - Full 1Fi Marketplace with dynamic catalog
 */
export function ShopPage() {
  const [activeTab, setActiveTab] = useState('top-brands');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrands = TOP_BRANDS.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStores = NEARBY_STORES.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="shop-screen">
      {/* 1. Deep Blue/Purple Hero Section (Exact Match to Screenshot 3) */}
      <section className="shop-hero">
        <div className="hero-badge-pill">
          <span className="badge-sparkle">✦</span>
          <span>NO-COST EMIs</span>
        </div>

        <div className="hero-text-wrap">
          <h1 className="shop-hero-headline">
            Shop today,<br />
            Pay later using<br />
            Mutual funds.
          </h1>
          <p className="shop-hero-sub">
            No credit score required. No interest.<br />
            Backed by your investments.
          </p>
        </div>

        {/* 3D Gadgets, Vehicles & Shopping Bag Illustration Graphic */}
        <div className="shop-hero-illustration" aria-hidden="true">
          <div className="floating-bag">
            <span className="bag-icon">🛍️</span>
            <span className="confetti-spark c-spark-1">🎉</span>
            <span className="confetti-spark c-spark-2">✨</span>
          </div>
          <div className="floating-gadgets">
            <span className="gadget-phone">📱</span>
            <span className="gadget-laptop">💻</span>
            <span className="gadget-car">🚗</span>
            <span className="gadget-bike">🏍️</span>
          </div>
        </div>
      </section>

      {/* 2. Three-Tab Segmented Selector (Top Brands | Nearby Stores | 1Fi Marketplace) */}
      <div className="shop-tabs-container">
        <div className="segmented-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'top-brands'}
            className={`seg-tab ${activeTab === 'top-brands' ? 'seg-tab--active' : ''}`}
            onClick={() => setActiveTab('top-brands')}
          >
            <span className="seg-tab-label">Top Brands</span>
            {activeTab === 'top-brands' && <span className="seg-active-bar" />}
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'nearby-stores'}
            className={`seg-tab ${activeTab === 'nearby-stores' ? 'seg-tab--active' : ''}`}
            onClick={() => setActiveTab('nearby-stores')}
          >
            <span className="seg-tab-label">Nearby Stores</span>
            {activeTab === 'nearby-stores' && <span className="seg-active-bar" />}
          </button>

          <button
            role="tab"
            aria-selected={activeTab === '1fi-marketplace'}
            className={`seg-tab ${activeTab === '1fi-marketplace' ? 'seg-tab--active' : ''}`}
            onClick={() => setActiveTab('1fi-marketplace')}
          >
            <span className="seg-tab-label">1Fi Marketplace</span>
            {activeTab === '1fi-marketplace' && <span className="seg-active-bar" />}
          </button>
        </div>
      </div>

      {/* 3. Search Bar */}
      <div className="shop-search-wrapper">
        <div className="shop-search-input-box">
          <svg className="search-glass-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder={
              activeTab === '1fi-marketplace'
                ? 'Search products, brands, models...'
                : activeTab === 'top-brands'
                ? 'Search online stores...'
                : 'Search nearby stores...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
      </div>

      {/* 4. Tab Content Sections */}
      <div className="shop-body">
        {/* Tab A: TOP BRANDS (Matching Screenshot 3) */}
        {activeTab === 'top-brands' && (
          <div className="top-brands-section">
            <h2 className="section-headline">Top Brands</h2>

            <div className="brands-card-list">
              {filteredBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="brand-row-card"
                  onClick={() => setActiveTab('1fi-marketplace')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="brand-logo-box" style={{ backgroundColor: brand.color }}>
                    {brand.logoType === 'airindia' && (
                      <div className="logo-airindia">
                        <span className="ai-text">AIR INDIA</span>
                      </div>
                    )}
                    {brand.logoType === 'apple' && (
                      <div className="logo-apple">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.6-0.74 1.01-1.77.9-2.8-.88.04-1.94.59-2.57 1.33-.56.64-1.05 1.68-.92 2.69 1 .08 1.99-.48 2.59-1.22z"/>
                        </svg>
                        <span className="apple-reseller-text">Premium Reseller</span>
                      </div>
                    )}
                    {brand.logoType === 'caratlane' && (
                      <div className="logo-caratlane">
                        <span className="cl-dots">❖</span>
                        <span className="cl-text">CARATLANE</span>
                      </div>
                    )}
                    {brand.logoType === 'easemytrip' && (
                      <span className="logo-emt-text">EaseMyTrip</span>
                    )}
                    {brand.logoType === 'taj' && (
                      <div className="logo-taj-box">
                        <span className="taj-crest-white">❖</span>
                        <span className="taj-name-white">TAJ</span>
                      </div>
                    )}
                    {brand.logoType === 'reliance' && (
                      <div className="logo-rel-box">
                        <span className="rel-white">reliance</span>
                        <span className="rel-sub-white">digital</span>
                      </div>
                    )}
                  </div>

                  <div className="brand-card-content">
                    <h3 className="brand-card-name">{brand.name}</h3>
                    <p className="brand-card-emi">{brand.emi}</p>
                  </div>

                  <div className="brand-card-arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab B: NEARBY STORES */}
        {activeTab === 'nearby-stores' && (
          <div className="nearby-stores-section">
            <div className="nearby-location-bar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C28D9" strokeWidth="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Mumbai, Maharashtra</span>
              <button className="change-loc-btn">Change</button>
            </div>

            <h2 className="section-headline">Partner Stores Near You</h2>

            <div className="stores-list">
              {filteredStores.map((store) => (
                <div key={store.id} className="brand-row-card store-card">
                  <div className="brand-logo-box" style={{ backgroundColor: store.color }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                      <path d="M3 9l1.5-5h15L21 9" />
                      <path d="M3 9v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9" />
                    </svg>
                  </div>
                  <div className="brand-card-content">
                    <div className="store-header-row">
                      <h3 className="brand-card-name">{store.name}</h3>
                      <span className="store-dist-badge">{store.distance}</span>
                    </div>
                    <p className="store-loc-text">{store.location}</p>
                    <p className="brand-card-emi">{store.emi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab C: 1FI MARKETPLACE (Assignment Core Feature) */}
        {activeTab === '1fi-marketplace' && (
          <ProductList searchQuery={searchQuery} />
        )}
      </div>
    </div>
  );
}
