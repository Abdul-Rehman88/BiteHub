import { Layout, ProtectedRoute } from './components/component_index'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Reservation, Menu, Cart, LogIn, SignUp } from './pages/index.js'
import { Toaster } from 'react-hot-toast';
import useCartSync from './hook/useCartSync';
import AdminRoutes from "./admin/routes/AdminRoutes.jsx";


function App() {
  useCartSync();

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Router>
        <Routes>

          {/* User routes (with header/footer) */}
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/reservation' element={<Reservation />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/cart' element={ <ProtectedRoute> <Cart /> </ProtectedRoute>}/>
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>

          {/* Admin routes (NO header/footer) */}
          <Route path="/admin/*" element={ 
            <ProtectedRoute requireAdmin={true}>
                <AdminRoutes />
            </ProtectedRoute>} />

        </Routes>
      </Router>
    </>
  )
}

export default App

