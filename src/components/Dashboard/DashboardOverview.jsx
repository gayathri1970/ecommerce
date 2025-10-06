import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const DashboardOverview = () => {
  const { getDashboardStats, getRecentOrders } = useContext(ShopContext);

  const stats = getDashboardStats();
  const recentOrders = getRecentOrders();

  return (
    <div className="dashboard-overview">
      <h1>Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-number">${stats.totalRevenue.toLocaleString()}</p>
          <span className="stat-growth">+{stats.monthlyGrowth}% this month</span>
        </div>
        
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">{stats.totalOrders}</p>
          <span className="stat-label">This Month</span>
        </div>
        
        <div className="stat-card">
          <h3>Products</h3>
          <p className="stat-number">{stats.totalProducts}</p>
          <span className="stat-label">Active Items</span>
        </div>
        
        <div className="stat-card">
          <h3>Customers</h3>
          <p className="stat-number">{stats.totalCustomers}</p>
          <span className="stat-label">Registered Users</span>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="dashboard-section">
        <h2>Recent Orders</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.id}>
                <td>#ORD-{order.id.toString().padStart(3, '0')}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>${order.amount}</td>
                <td>
                  <span className={`status ${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button className="btn-primary">Add New Product</button>
          <button className="btn-success">View All Orders</button>
          <button className="btn-primary">Generate Report</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;