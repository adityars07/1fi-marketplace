import { useNavigate } from 'react-router-dom';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../hooks/useEMI';
import './ProductCard.css';

/**
 * Product card component for the marketplace grid
 * Displays product image, name, pricing, and starting EMI
 * All data comes from props (fetched by parent from API)
 */
export function ProductCard({ product }) {
  const navigate = useNavigate();

  const effectivePrice = product.basePrice - (product.discount || 0);
  const hasDiscount = product.discount > 0;

  // Get the lowest EMI from available plans
  const lowestEMI = product.emiPlans.reduce((min, plan) => {
    if (plan.interestRate === 0) {
      const emi = Math.ceil(effectivePrice / plan.tenure);
      return emi < min ? emi : min;
    }
    return min;
  }, Infinity);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <article
      className="product-card"
      onClick={handleClick}
      role="link"
      tabIndex={0}
      aria-label={`${product.name} - ${formatCurrency(effectivePrice)}`}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Tags */}
      {product.tags.length > 0 && (
        <div className="card-tags">
          <Badge variant={product.tags[0] === 'No Cost EMI' ? 'success' : 'default'} size="sm">
            {product.tags[0]}
          </Badge>
        </div>
      )}

      {/* Product Image */}
      <div className="card-image-wrapper">
        <img
          src={product.images[0]}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="card-info">
        <span className="card-brand">{product.brand}</span>
        <h3 className="card-name">{product.name}</h3>

        <div className="card-pricing">
          <span className="card-price">{formatCurrency(effectivePrice)}</span>
          {hasDiscount && (
            <span className="card-original-price">{formatCurrency(product.basePrice)}</span>
          )}
        </div>

        {lowestEMI !== Infinity && (
          <div className="card-emi">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            From {formatCurrency(lowestEMI)}/mo
          </div>
        )}
      </div>
    </article>
  );
}
