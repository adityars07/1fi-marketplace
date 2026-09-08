import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { AppShell } from './components/Layout/AppShell';
import { HomePage } from './components/Home/HomePage';
import { ShopPage } from './components/Shop/ShopPage';
import { ProductDetail } from './components/Marketplace/ProductDetail';

/**
 * Main App component with routing
 * Wraps everything in MarketplaceProvider for global state
 */
function App() {
  return (
    <MarketplaceProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MarketplaceProvider>
  );
}

export default App;
