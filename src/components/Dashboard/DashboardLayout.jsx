import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";

const DashboardLayout = () => {
  const { logoutAdmin, isAdmin } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/");
  };

  if (!isAdmin) {
    return (
      <div className="admin-auth-required">
        <h2>Admin Access Required</h2>
        <p>Please log in as administrator to access the dashboard.</p>
        <button className="btn-primary" onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="dashboard-container">
      {/* Admin Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link 
                to="/admin" 
                className={isActive('/admin') && location.pathname === '/admin' ? 'active' : ''}
              >
                <span>📊</span> Overview
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/products" 
                className={isActive('/admin/products') ? 'active' : ''}
              >
                <span>🛍️</span> Products
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/orders" 
                className={isActive('/admin/orders') ? 'active' : ''}
              >
                <span>📦</span> Orders
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/customers" 
                className={isActive('/admin/customers') ? 'active' : ''}
              >
                <span>👥</span> Customers
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/analytics" 
                className={isActive('/admin/analytics') ? 'active' : ''}
              >
                <span>📈</span> Analytics
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                <span>🚪</span> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;