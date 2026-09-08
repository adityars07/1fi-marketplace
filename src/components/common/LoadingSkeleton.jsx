import './LoadingSkeleton.css';

/**
 * Skeleton loading placeholder component
 * Renders shimmer placeholders matching the layout of product cards or detail page
 */
export function ProductCardSkeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-image shimmer" />
      <div className="skeleton-content">
        <div className="skeleton-line shimmer" style={{ width: '60%' }} />
        <div className="skeleton-line shimmer short" style={{ width: '80%' }} />
        <div className="skeleton-line shimmer" style={{ width: '45%' }} />
      </div>
    </div>
  );
}

export function ProductListSkeleton({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="skeleton-detail" aria-hidden="true">
      <div className="skeleton-detail-image shimmer" />
      <div className="skeleton-detail-content">
        <div className="skeleton-line shimmer" style={{ width: '40%', height: '14px' }} />
        <div className="skeleton-line shimmer" style={{ width: '70%', height: '24px' }} />
        <div className="skeleton-line shimmer" style={{ width: '35%', height: '20px' }} />
        <div className="skeleton-divider" />
        <div className="skeleton-line shimmer" style={{ width: '30%', height: '14px' }} />
        <div className="skeleton-swatches">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-swatch shimmer" />
          ))}
        </div>
        <div className="skeleton-divider" />
        <div className="skeleton-line shimmer" style={{ width: '30%', height: '14px' }} />
        <div className="skeleton-chips">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton-chip shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="skeleton-categories" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="skeleton-category-chip shimmer" />
      ))}
    </div>
  );
}
