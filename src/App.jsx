import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary'; 
import LoadingSpinner from './components/LoadingSpinner';
import ErrorPage from './components/ErrorPage'; 

// Lazy load components
const Page = lazy(() => import('./components/Page'));
const ProductList = lazy(() => import('./components/ProductList'));
const Cart = lazy(() => import('./components/Cart'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const CartItem = lazy(() => import('./components/CartItem'));
const NavBar = lazy(() => import('./components/NavBar'));

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <aside className="w-1/6">
          <Suspense fallback={<LoadingSpinner />}>
            <NavBar />
          </Suspense>
        </aside>
        <main className="flex-1 p-4 overflow-auto">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Page />} />
                <Route path="/productlist" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cartitem/:id" element={<CartItem />} />
                {/* Fallback Route for any undefined path */}
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </Router>
  );
}

export default App;
