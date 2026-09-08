import { formatCurrency } from '../../hooks/useEMI';
import './EMISummary.css';

/**
 * EMI summary breakdown card
 * Shows detailed cost breakdown for the selected EMI plan
 * All values computed dynamically, never hardcoded
 */
export function EMISummary({ plan, productPrice }) {
  if (!plan) return null;

  return (
    <div className="emi-summary animate-scale-in">
      <div className="emi-summary-header">
        <div className="summary-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div>
          <h4 className="summary-title">EMI Breakdown</h4>
          <p className="summary-subtitle">
            {plan.isNoCostEMI ? 'No Cost EMI' : `${plan.interestRate}% p.a. interest`}
          </p>
        </div>
      </div>

      <div className="emi-summary-body">
        <div className="summary-row">
          <span className="summary-label">Product Price</span>
          <span className="summary-value">{formatCurrency(productPrice)}</span>
        </div>

        {plan.tenure && (
          <div className="summary-row">
            <span className="summary-label">EMI Tenure</span>
            <span className="summary-value">{plan.tenure} months</span>
          </div>
        )}

        <div className="summary-row">
          <span className="summary-label">Monthly EMI</span>
          <span className="summary-value summary-value--highlight">
            {formatCurrency(plan.monthlyEMI)}
          </span>
        </div>

        {plan.totalInterest > 0 && (
          <div className="summary-row">
            <span className="summary-label">Total Interest</span>
            <span className="summary-value">{formatCurrency(plan.totalInterest)}</span>
          </div>
        )}

        {plan.processingFee > 0 && (
          <div className="summary-row">
            <span className="summary-label">Processing Fee</span>
            <span className="summary-value">{formatCurrency(plan.processingFee)}</span>
          </div>
        )}

        <div className="summary-divider" />

        <div className="summary-row summary-row--total">
          <span className="summary-label">Total Payable</span>
          <span className="summary-value">
            {formatCurrency(plan.totalAmount + plan.processingFee)}
          </span>
        </div>

        {plan.isNoCostEMI && (
          <div className="summary-saving">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            </svg>
            You save on interest — 0% cost EMI!
          </div>
        )}
      </div>
    </div>
  );
}
