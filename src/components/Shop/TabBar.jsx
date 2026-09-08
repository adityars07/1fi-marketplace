import './TabBar.css';

/**
 * Horizontal tab bar component matching 1Fi's navigation style
 */
export function TabBar({ tabs, activeTab, onTabChange }) {
  return (
    <div className="tab-bar" role="tablist" aria-label="Shop sections">
      {tabs.map(tab => (
        <button
          key={tab.id}
          role="tab"
          id={`tab-${tab.id}`}
          aria-selected={activeTab === tab.id}
          aria-controls={`tabpanel-${tab.id}`}
          className={`tab-item ${activeTab === tab.id ? 'tab-item--active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
          {tab.id === '1fi-marketplace' && (
            <span className="tab-dot" aria-hidden="true" />
          )}
        </button>
      ))}
    </div>
  );
}
