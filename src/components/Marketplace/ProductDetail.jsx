import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../../api/mockApi';
import { useEMI, formatCurrency } from '../../hooks/useEMI';
import { useMarketplaceDispatch } from '../../context/MarketplaceContext';
import { VariantSelector } from './VariantSelector';
import { EMIPlanSelector } from './EMIPlanSelector';
import { EMISummary } from './EMISummary';
import { Badge } from '../common/Badge';
import { ProductDetailSkeleton } from '../common/LoadingSkeleton';
import { ErrorState } from '../common/ErrorState';
import { submitEMIApplication } from '../../api/mockApi';
import './ProductDetail.css';

/**
 * Full product detail page with variant selection, EMI plans, and CTA
 * All product data fetched dynamically from mock API
 */
export function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useMarketplaceDispatch();

  // Product data state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Variant selection state
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  // Fetch product data
  const loadProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductById(productId);
      setProduct(data);
      // Set default selections
      if (data.variants.colors.length > 0) {
        setSelectedColor(data.variants.colors[0].id);
      }
      if (data.variants.storage.length > 0) {
        setSelectedStorage(data.variants.storage[0].id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [loadProduct]);

  // Fetch EMI plans based on variant selection
  const { plans: emiPlans, productPrice, loading: emiLoading } = useEMI(
    productId,
    { colorId: selectedColor, storageId: selectedStorage }
  );

  // Set or update selected EMI plan when plans change
  useEffect(() => {
    if (emiPlans.length > 0) {
      setSelectedPlan(prev => {
        if (!prev) return emiPlans[0];
        const match = emiPlans.find(p => p.tenure === prev.tenure);
        return match || emiPlans[0];
      });
    }
  }, [emiPlans]);

  // Get current image based on selected color
  const getCurrentImage = () => {
    if (!product) return '';
    if (selectedColor && product.variants.colors.length > 0) {
      const color = product.variants.colors.find(c => c.id === selectedColor);
      if (color) {
        return product.images[color.imageIndex] || product.images[0];
      }
    }
    return product.images[0];
  };

  // Handle EMI submission
  const handleProceed = async () => {
    if (!selectedPlan) return;

    setSubmitting(true);
    try {
      const result = await submitEMIApplication({
        productId,
        variantConfig: { colorId: selectedColor, storageId: selectedStorage },
        selectedPlan,
      });

      dispatch({
        type: 'SHOW_TOAST',
        payload: {
          type: 'success',
          message: `${result.message} Order: ${result.orderId}`,
        },
      });

      // Navigate back after a short delay
      setTimeout(() => navigate('/shop'), 2000);
    } catch (err) {
      dispatch({
        type: 'SHOW_TOAST',
        payload: { type: 'error', message: err.message },
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <ProductDetailSkeleton />;
  if (error) return <ErrorState message={error} onRetry={loadProduct} />;
  if (!product) return <ErrorState message="Product not found" />;

  const hasDiscount = product.discount > 0;

  return (
    <div className="product-detail">
      {/* Detail Header */}
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <span className="detail-header-title">{product.brand}</span>
        <button className="share-btn" aria-label="Share product">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      </div>

      {/* Product Image */}
      <div className="detail-image-section">
        <div className="detail-image-wrapper">
          <img
            src={getCurrentImage()}
            alt={`${product.name} - ${selectedColor || ''}`}
            className="detail-image"
          />
        </div>
        {/* Image dots indicator */}
        <div className="image-dots">
          {product.images.slice(0, 3).map((_, i) => (
            <span
              key={i}
              className={`image-dot ${i === 0 ? 'image-dot--active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="detail-body">
        {/* Tags */}
        <div className="detail-tags">
          {product.tags.map((tag, i) => (
            <Badge
              key={i}
              variant={tag === 'No Cost EMI' ? 'success' : tag === 'Best Seller' ? 'accent' : 'default'}
              size="md"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="detail-name">{product.name}</h1>

        {/* Rating */}
        <div className="detail-rating">
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(star => (
              <svg
                key={star}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={star <= Math.round(product.rating) ? '#F59E0B' : 'none'}
                stroke="#F59E0B"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="rating-value">{product.rating}</span>
          <span className="rating-count">({product.reviewCount.toLocaleString('en-IN')} reviews)</span>
        </div>

        {/* Price */}
        <div className="detail-pricing">
          <span className="detail-price">{formatCurrency(productPrice)}</span>
          {hasDiscount && (
            <>
              <span className="detail-original">{formatCurrency(product.basePrice)}</span>
              <Badge variant="success" size="sm">
                {Math.round((product.discount / product.basePrice) * 100)}% off
              </Badge>
            </>
          )}
        </div>

        <p className="detail-description">{product.description}</p>

        {/* Divider */}
        <div className="detail-divider" />

        {/* Variant Selectors */}
        <VariantSelector
          variants={product.variants}
          selectedColor={selectedColor}
          selectedStorage={selectedStorage}
          onColorChange={setSelectedColor}
          onStorageChange={(storageId) => {
            setSelectedStorage(storageId);
            setSelectedPlan(null); // Reset plan when price changes
          }}
        />

        {/* Divider */}
        <div className="detail-divider" />

        {/* EMI Plans */}
        <EMIPlanSelector
          plans={emiPlans}
          selectedPlan={selectedPlan}
          onPlanSelect={setSelectedPlan}
          loading={emiLoading}
        />

        {/* EMI Summary */}
        {selectedPlan && (
          <EMISummary plan={selectedPlan} productPrice={productPrice} />
        )}

        {/* Divider */}
        <div className="detail-divider" />

        {/* Specifications */}
        <div className="detail-specs-section">
          <button
            className="specs-toggle"
            onClick={() => setShowSpecs(!showSpecs)}
            aria-expanded={showSpecs}
          >
            <span className="specs-toggle-label">Specifications</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`specs-chevron ${showSpecs ? 'specs-chevron--open' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {showSpecs && (
            <div className="specs-table animate-fade-in">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="spec-row">
                  <span className="spec-label">{key}</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom spacing for CTA */}
        <div style={{ height: '80px' }} />
      </div>

      {/* Sticky CTA */}
      <div className="detail-cta-wrapper">
        <div className="detail-cta-info">
          {selectedPlan && (
            <>
              <span className="cta-emi">{formatCurrency(selectedPlan.monthlyEMI)}/mo</span>
              <span className="cta-tenure">{selectedPlan.tenure} months</span>
            </>
          )}
        </div>
        <button
          className={`detail-cta-btn ${submitting ? 'detail-cta-btn--loading' : ''}`}
          onClick={handleProceed}
          disabled={!selectedPlan || submitting}
        >
          {submitting ? (
            <span className="cta-spinner" />
          ) : (
            <>
              Proceed with EMI
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
