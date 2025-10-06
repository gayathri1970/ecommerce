import React, { createContext, useState } from "react";
import all_product from "../components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminProducts, setAdminProducts] = useState(all_product);
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      email: "john@example.com",
      date: "2024-01-15",
      amount: 120.00,
      status: "delivered",
      items: [
        { productId: 1, quantity: 2, price: 50.00 },
        { productId: 3, quantity: 1, price: 20.00 }
      ]
    },
    {
      id: 2,
      customer: "Jane Smith",
      email: "jane@example.com",
      date: "2024-01-14",
      amount: 89.99,
      status: "pending",
      items: [
        { productId: 2, quantity: 1, price: 89.99 }
      ]
    },
    {
      id: 3,
      customer: "Mike Johnson",
      email: "mike@example.com",
      date: "2024-01-13",
      amount: 210.50,
      status: "processing",
      items: [
        { productId: 4, quantity: 1, price: 100.00 },
        { productId: 5, quantity: 1, price: 85.00 },
        { productId: 6, quantity: 1, price: 25.50 }
      ]
    }
  ]);
  
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joinDate: "2024-01-10",
      totalOrders: 3,
      totalSpent: 450.00
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joinDate: "2024-01-12",
      totalOrders: 1,
      totalSpent: 89.99
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      joinDate: "2024-01-08",
      totalOrders: 5,
      totalSpent: 890.50
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      joinDate: "2024-01-05",
      totalOrders: 2,
      totalSpent: 210.00
    }
  ]);

  // Existing cart functions
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        total += cartItems[item];
      }
    }
    return total;
  };

  // Admin functions
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: adminProducts.length + 1,
      image: product.image || "/default-product.png" // Default image if none provided
    };
    setAdminProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updatedProduct) => {
    setAdminProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id) => {
    setAdminProducts(prev => prev.filter(product => product.id !== id));
  };

  // Order management functions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Math.max(...orders.map(o => o.id), 0) + 1,
      date: new Date().toISOString().split('T')[0]
    };
    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  // Customer management functions
  const updateCustomer = (id, updatedCustomer) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === id ? { ...customer, ...updatedCustomer } : customer
      )
    );
  };

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
  };

  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      joinDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: 0
    };
    setCustomers(prev => [...prev, newCustomer]);
    return newCustomer;
  };

  // Admin authentication
  const loginAsAdmin = () => {
    setIsAdmin(true);
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  // Analytics and statistics
  const getDashboardStats = () => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
    const totalOrders = orders.length;
    const totalProducts = adminProducts.length;
    const totalCustomers = customers.length;
    
    const monthlyRevenue = orders
      .filter(order => order.date.startsWith('2024-01'))
      .reduce((sum, order) => sum + order.amount, 0);
    
    const monthlyGrowth = totalRevenue > 0 ? ((monthlyRevenue / totalRevenue) * 100).toFixed(1) : 0;

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      totalCustomers,
      monthlyRevenue,
      monthlyGrowth
    };
  };

  const getCategoryStats = () => {
    const categoryCount = {};
    adminProducts.forEach(product => {
      categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    });
    return categoryCount;
  };

  const getRecentOrders = (limit = 5) => {
    return orders
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  const getTopCustomers = (limit = 5) => {
    return customers
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, limit);
  };

  const contextValue = {
    // Cart functionality
    getTotalCartAmount,
    getTotalCartItems,
    all_product: adminProducts,
    cartItems,
    addToCart,
    removeFromCart,
    
    // Admin authentication
    isAdmin,
    loginAsAdmin,
    logoutAdmin,
    
    // Product management
    adminProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    
    // Order management
    orders,
    updateOrderStatus,
    deleteOrder,
    addOrder,
    getRecentOrders,
    
    // Customer management
    customers,
    updateCustomer,
    deleteCustomer,
    addCustomer,
    getTopCustomers,
    
    // Analytics
    getDashboardStats,
    getCategoryStats
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;