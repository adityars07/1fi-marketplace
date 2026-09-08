import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from './ProductCard';
import { ProductListSkeleton, CategorySkeleton } from '../common/LoadingSkeleton';
import { ErrorState, EmptyState } from '../common/ErrorState';
import './ProductList.css';

/**
 * Product listing grid with category filters and search filtering
 * Designed for 1Fi Marketplace
 */
export function ProductList({ searchQuery = '' }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const { products, categories, loading, error, refetch } = useProducts(activeCategory);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  // Filter products by search query if provided
  const filteredProducts = products.filter(product => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="product-list-wrapper">
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
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Results Header */}
      <div className="product-results-header">
        <h2 className="results-title">
          {activeCategory === 'all' ? 'All Products' : categories.find(c => c.id === activeCategory)?.name || 'Products'}
        </h2>
        {!loading && (
          <span className="results-count">{filteredProducts.length} items</span>
        )}
      </div>

      {/* Product Grid */}
      {loading ? (
        <ProductListSkeleton count={4} />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          message={searchQuery ? `No items matching "${searchQuery}". Try a different keyword.` : "No products available in this category."}
        />
      ) : (
        <div className="product-grid" role="region" aria-label="Product list">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Category icons
 */
function CategoryIcon({ name }) {
  switch (name) {
    case 'grid':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case 'smartphone':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="3" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case 'laptop':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );
    case 'headphones':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      );
    case 'tablet':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    default:
      return null;
  }
}
