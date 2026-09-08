import { formatCurrency } from '../../hooks/useEMI';
import './VariantSelector.css';

/**
 * Variant selector for color and storage/size options
 * All variant data comes from props (fetched from API)
 */
export function VariantSelector({
  variants,
  selectedColor,
  selectedStorage,
  onColorChange,
  onStorageChange,
}) {
  const hasColors = variants.colors && variants.colors.length > 0;
  const hasStorage = variants.storage && variants.storage.length > 0;

  if (!hasColors && !hasStorage) return null;

  const selectedColorObj = variants.colors?.find(c => c.id === selectedColor);

  return (
    <div className="variant-selector">
      {/* Color Selection */}
      {hasColors && (
        <div className="variant-group">
          <div className="variant-label">
            <span className="variant-label-title">Color</span>
            {selectedColorObj && (
              <span className="variant-label-value">{selectedColorObj.name}</span>
            )}
          </div>
          <div className="color-options" role="radiogroup" aria-label="Select color">
            {variants.colors.map(color => (
              <button
                key={color.id}
                className={`color-swatch ${selectedColor === color.id ? 'color-swatch--selected' : ''}`}
                onClick={() => onColorChange(color.id)}
                aria-label={color.name}
                aria-checked={selectedColor === color.id}
                role="radio"
                title={color.name}
              >
                <span
                  className="swatch-inner"
                  style={{ backgroundColor: color.hex }}
                />
                {selectedColor === color.id && (
                  <svg className="swatch-check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Storage Selection */}
      {hasStorage && (
        <div className="variant-group">
          <div className="variant-label">
            <span className="variant-label-title">Storage</span>
          </div>
          <div className="storage-options" role="radiogroup" aria-label="Select storage">
            {variants.storage.map(storage => (
              <button
                key={storage.id}
                className={`storage-chip ${selectedStorage === storage.id ? 'storage-chip--selected' : ''}`}
                onClick={() => onStorageChange(storage.id)}
                aria-label={`${storage.name}${storage.priceAdd > 0 ? ` (+${formatCurrency(storage.priceAdd)})` : ''}`}
                aria-checked={selectedStorage === storage.id}
                role="radio"
              >
                <span className="storage-name">{storage.name}</span>
                {storage.priceAdd > 0 && (
                  <span className="storage-add">+{formatCurrency(storage.priceAdd)}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
