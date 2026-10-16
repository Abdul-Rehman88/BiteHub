
import { lazy, Suspense } from 'react';
import { Layout, ProtectedRoute } from './components/component_index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useCartSync from './hook/useCartSync';
import AdminRoutes from './admin/routes/AdminRoutes.jsx';

// Load Home and Menu normally
import Home from './pages/home/Home.jsx';
import Menu from './pages/menu/Menu.jsx';

// Load other pages only when visited
const Reservation = lazy(() => import('./pages/reservation/Reservation.jsx'));
const Cart = lazy(() => import('./pages/cart/Cart.jsx'));
const LogIn = lazy(() => import('./pages/login/LogIn.jsx'));
const SignUp = lazy(() => import('./pages/signup/SignUp.jsx'));
const ItemDetail = lazy(() => import('./pages/itemdetail/ItemDetail.jsx'));
const ForgotPassword = lazy(() => import('./pages/reset_password/ForgotPassword.jsx'));
const ResetPassword = lazy(() => import('./pages/reset_password/ResetPassword.jsx'));

function App() {
  useCartSync();

  return (
    <>
      {/* Display toast notifications */}
      <Toaster position="bottom-right" reverseOrder={false} />

      <Router>
        {/* Show a fallback while lazy pages load */}
        <Suspense fallback={<div>Loading page...</div>}>
          <Routes>
            {/* Customer pages with header and footer */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/reservation" element={<Reservation />} />

              {/* Cart requires authentication */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Admin pages without the customer layout */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminRoutes />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
