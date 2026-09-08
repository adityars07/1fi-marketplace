import { formatCurrency } from '../../hooks/useEMI';
import './EMIPlanSelector.css';

/**
 * EMI plan tenure selector component
 * Displays available EMI tenures as selectable chips
 * All plan data comes from props (computed by useEMI hook from API data)
 */
export function EMIPlanSelector({ plans, selectedPlan, onPlanSelect, loading }) {
  if (loading) {
    return (
      <div className="emi-selector">
        <h3 className="emi-selector-title">Select EMI Plan</h3>
        <div className="emi-plans-loading">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="emi-plan-skeleton shimmer" />
          ))}
        </div>
      </div>
    );
  }

  if (!plans || plans.length === 0) return null;

  return (
    <div className="emi-selector">
      <div className="emi-selector-header">
        <h3 className="emi-selector-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
          Select EMI Plan
        </h3>
        <span className="emi-selector-subtitle">Powered by Mutual Funds</span>
      </div>

      <div className="emi-plans-grid" role="radiogroup" aria-label="Select EMI tenure">
        {plans.map(plan => {
          const isSelected = selectedPlan?.tenure === plan.tenure;

          return (
            <button
              key={plan.tenure}
              className={`emi-plan-chip ${isSelected ? 'emi-plan-chip--selected' : ''} ${plan.isNoCostEMI ? 'emi-plan-chip--nocost' : ''}`}
              onClick={() => onPlanSelect(plan)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${plan.tenure} months - ${formatCurrency(plan.monthlyEMI)} per month`}
            >
              <span className="plan-tenure">{plan.tenure} mo</span>
              <span className="plan-emi">{formatCurrency(plan.monthlyEMI)}</span>
              {plan.isNoCostEMI && (
                <span className="plan-nocost-badge">0%</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
