import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Pages/Product";
import LoginSignup from "./Pages/LoginSignup";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Cart from "./Pages/Cart";
import Footer from "./components/footer/Footer.jsx";
import men_banner from "./components/Assets/banner_mens.png"
import women_banner from "./components/Assets/banner_women.png"
import kid_banner from "./components/Assets/banner_kids.png"

// Import Dashboard Components
import DashboardLayout from "./components/Dashboard/DashboardLayout.jsx";
import DashboardOverview from "./components/Dashboard/DashboardOverview.jsx";
import ProductsManagement from "./components/Dashboard/ProductsManagement.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Existing Routes */}
          <Route path="/" element={<Shop />} />
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
           </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="orders" element={<div className="dashboard-section"><h1>Orders Management - Coming Soon</h1></div>} />
            <Route path="customers" element={<div className="dashboard-section"><h1>Customers Management - Coming Soon</h1></div>} />
            <Route path="analytics" element={<div className="dashboard-section"><h1>Analytics - Coming Soon</h1></div>} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;