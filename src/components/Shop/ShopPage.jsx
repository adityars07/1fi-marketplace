import { useState } from 'react';
import { TabBar } from './TabBar';
import { ProductList } from '../Marketplace/ProductList';
import './ShopPage.css';

const TABS = [
  { id: 'top-brands', label: 'Top Brands' },
  { id: 'nearby-stores', label: 'Nearby Stores' },
  { id: '1fi-marketplace', label: '1Fi Marketplace' },
];

/**
 * Shop page with three tabs.
 * Only "1Fi Marketplace" tab is fully implemented per assignment requirements.
 */
export function ShopPage() {
  const [activeTab, setActiveTab] = useState('1fi-marketplace');

  return (
    <div className="shop-page">
      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="shop-content">
        {activeTab === 'top-brands' && (
          <PlaceholderTab
            title="Top Brands"
            description="Discover products from top brands. Coming soon!"
            icon={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            }
          />
        )}

        {activeTab === 'nearby-stores' && (
          <PlaceholderTab
            title="Nearby Stores"
            description="Find partner stores near you. Coming soon!"
            icon={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
          />
        )}

        {activeTab === '1fi-marketplace' && <ProductList />}
      </div>
    </div>
  );
}

/**
 * Placeholder content for unimplemented tabs
 */
function PlaceholderTab({ title, description, icon }) {
  return (
    <div className="placeholder-tab">
      <div className="placeholder-icon">{icon}</div>
      <h2 className="placeholder-title">{title}</h2>
      <p className="placeholder-desc">{description}</p>
      <div className="placeholder-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        Coming Soon
      </div>
    </div>
  );
}
