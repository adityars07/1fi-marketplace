import { createContext, useContext, useReducer } from 'react';

const MarketplaceContext = createContext(null);
const MarketplaceDispatchContext = createContext(null);

const initialState = {
  // Selected product variant config
  selectedColor: null,
  selectedStorage: null,
  // Selected EMI plan
  selectedEMIPlan: null,
  // Active category filter
  activeCategory: 'all',
  // Toast notifications
  toast: null,
};

function marketplaceReducer(state, action) {
  switch (action.type) {
    case 'SET_COLOR':
      return { ...state, selectedColor: action.payload };
    case 'SET_STORAGE':
      return { ...state, selectedStorage: action.payload };
    case 'SET_EMI_PLAN':
      return { ...state, selectedEMIPlan: action.payload };
    case 'SET_CATEGORY':
      return { ...state, activeCategory: action.payload };
    case 'RESET_SELECTION':
      return {
        ...state,
        selectedColor: null,
        selectedStorage: null,
        selectedEMIPlan: null,
      };
    case 'SHOW_TOAST':
      return { ...state, toast: action.payload };
    case 'HIDE_TOAST':
      return { ...state, toast: null };
    default:
      return state;
  }
}

export function MarketplaceProvider({ children }) {
  const [state, dispatch] = useReducer(marketplaceReducer, initialState);

  return (
    <MarketplaceContext.Provider value={state}>
      <MarketplaceDispatchContext.Provider value={dispatch}>
        {children}
      </MarketplaceDispatchContext.Provider>
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}

export function useMarketplaceDispatch() {
  const context = useContext(MarketplaceDispatchContext);
  if (!context) {
    throw new Error('useMarketplaceDispatch must be used within a MarketplaceProvider');
  }
  return context;
}
