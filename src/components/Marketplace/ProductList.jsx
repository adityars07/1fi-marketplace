import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from './ProductCard';
import { ProductListSkeleton, CategorySkeleton } from '../common/LoadingSkeleton';
import { ErrorState, EmptyState } from '../common/ErrorState';
import './ProductList.css';

/**
 * Product listing grid with category filters
 * Fetches data dynamically from mock API
 */
export function ProductList() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { products, categories, loading, error, refetch } = useProducts(activeCategory);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <div className="product-list-wrapper">
      {/* Marketplace Header */}
      <div className="marketplace-header">
        <div className="marketplace-banner">
          <div className="banner-content">
            <div className="banner-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
              </svg>
              Shop with Mutual Funds
            </div>
            <h2 className="banner-title">
              0% Interest EMI
            </h2>
            <p className="banner-subtitle">
              Buy now, pay later — backed by your investments
            </p>
          </div>
          <div className="banner-decoration">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.15">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      {loading && !categories.length ? (
        <CategorySkeleton />
      ) : (
        <div className="category-filters" role="toolbar" aria-label="Filter by category">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-chip ${activeCategory === cat.id ? 'category-chip--active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
              aria-pressed={activeCategory === cat.id}
            >
              <CategoryIcon name={cat.icon} />
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Product Count */}
      {!loading && products.length > 0 && (
        <div className="product-count">
          <span>{products.length} product{products.length !== 1 ? 's' : ''}</span>
        </div>
      )}

      {/* Product Grid */}
      {loading ? (
        <ProductListSkeleton count={6} />
      ) : products.length === 0 ? (
        <EmptyState
          title="No products found"
          message="Try selecting a different category."
        />
      ) : (
        <div className="product-grid">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`animate-fade-in-up stagger-${Math.min(index + 1, 8)}`}
              style={{ opacity: 0 }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Small icon component for category chips
 */
function CategoryIcon({ name }) {
  const icons = {
    grid: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    smartphone: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    laptop: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
      </svg>
    ),
    headphones: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    tablet: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  };

  return icons[name] || icons.grid;
}
