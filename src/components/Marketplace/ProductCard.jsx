import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../hooks/useEMI';
import './ProductCard.css';

/**
 * Product Card component matching 1Fi app aesthetics
 * Features clean white card, 16px radius, No Cost EMI badge,
 * original & discount pricing, and monthly installment highlight
 */
export function ProductCard({ product }) {
  const navigate = useNavigate();

  const effectivePrice = product.basePrice - (product.discount || 0);
  const hasDiscount = product.discount > 0;

  // Compute the lowest 0% EMI from available plans
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
      className="mobile-product-card"
      onClick={handleClick}
      role="link"
      tabIndex={0}
      aria-label={`${product.name} - ${formatCurrency(effectivePrice)}`}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Badge Tag */}
      <div className="card-badge-row">
        <span className="card-emi-tag">
          <span className="sparkle-dot">✦</span> No Cost EMI
        </span>
      </div>

      {/* Product Image */}
      <div className="card-img-box">
        <img
          src={product.images[0]}
          alt={product.name}
          className="card-img"
          loading="lazy"
        />
      </div>

      {/* Product Metadata */}
      <div className="card-meta">
        <span className="card-brand-label">{product.brand}</span>
        <h3 className="card-title-text">{product.name}</h3>

        {/* Pricing */}
        <div className="card-price-row">
          <span className="card-effective-price">{formatCurrency(effectivePrice)}</span>
          {hasDiscount && (
            <span className="card-mrp-price">{formatCurrency(product.basePrice)}</span>
          )}
        </div>

        {/* Monthly EMI Highlight */}
        {lowestEMI !== Infinity && (
          <div className="card-monthly-box">
            <span className="monthly-emi-amount">{formatCurrency(lowestEMI)}<span className="mo-text">/mo</span></span>
            <span className="zero-interest-pill">0% Int</span>
          </div>
        )}
      </div>
    </article>
  );
}
