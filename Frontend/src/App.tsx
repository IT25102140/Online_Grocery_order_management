import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Checkout } from './pages/Checkout';
import { Categories } from './pages/Categories';
import { MyAccount } from './pages/MyAccount';
import { PreviousOrders } from './pages/PreviousOrders';
import { PreviousPayments } from './pages/PreviousPayments';
import { MyCart } from './pages/MyCart';
import { CategoryPage } from './pages/CategoryPage';

// Admin Imports
import { AdminLayout } from './components/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { Orders } from './pages/admin/Orders';
import { Products } from './pages/admin/Products';
import { Customers } from './pages/admin/Customers';
import { Settings } from './pages/admin/Settings';
import { Payments } from './pages/admin/Payments';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public Storefront Routes rendered with global Navbar/Footer */}
            <Route element={<Layout><Outlet /></Layout>}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:categoryId" element={<CategoryPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* User Account Routes */}
              <Route path="/myaccount" element={<MyAccount />}>
                <Route path="previousorders" element={<PreviousOrders />} />
                <Route path="previouspayments" element={<PreviousPayments />} />
                <Route path="cart" element={<MyCart />} />
              </Route>
            </Route>

            {/* Admin Backend Routes rendered with AdminLayout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="customers" element={<Customers />} />
              <Route path="payments" element={<Payments />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
