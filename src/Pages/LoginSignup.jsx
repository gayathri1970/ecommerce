import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  
  const { loginAsAdmin } = useContext(ShopContext);
  const navigate = useNavigate();

  // Admin credentials (static but user needs to input manually)
  const adminCredentials = {
    email: "admin@saga.com",
    password: "admin123"
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        if (isAdminLogin) {
          // Admin login validation
          if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
            loginAsAdmin();
            navigate('/admin');
            alert("🔐 Welcome Admin!");
          } else {
            alert("❌ Invalid admin credentials!\n");
          }
        } else {
          // Regular user login
          alert(`✅ Logged in as ${formData.email}`);
        }
      } else {
        // Sign up
        alert(`🎉 Account created for ${formData.name}`);
      }
      
      // Reset form
      setFormData({ name: "", email: "", password: "" });
      setIsAdminLogin(false);
    } catch (error) {
      alert("❌ Something went wrong, please try again!");
    }
  };

  const handleAdminLoginClick = () => {
    setIsAdminLogin(true);
    // Don't pre-fill the form, let user input manually
    setFormData({
      name: "",
      email: "",
      password: ""
    });
  };

  const handleBackToUserLogin = () => {
    setIsAdminLogin(false);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        {/* Admin Login Header */}
        {isAdminLogin && (
          <div className="admin-login-header">
            <button 
              type="button" 
              className="back-btn"
              onClick={handleBackToUserLogin}
            >
              ← Back to User Login
            </button>
            <h2>🔐 Admin Login</h2>
          
          </div>
        )}

        {/* Main Form */}
        <form className="loginsignup-form" onSubmit={handleSubmit}>
          <h1>
            {isAdminLogin ? "Admin Login" : (isLogin ? "Login" : "Sign Up")}
          </h1>

          <div className="loginsignup-fields">
            {!isLogin && !isAdminLogin && (
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isAdminLogin && (
            <p className="loginsignup-toggle">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <span onClick={() => setIsLogin(false)}>Sign up here</span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span onClick={() => setIsLogin(true)}>Login here</span>
                </>
              )}
            </p>
          )}

          {!isLogin && !isAdminLogin && (
            <div className="loginsignup-agree">
              <input type="checkbox" id="agree" required />
              <label htmlFor="agree">
                By continuing, I agree to the <b>Terms of Use</b> &{" "}
                <b>Privacy Policy</b>.
              </label>
            </div>
          )}

          <button type="submit" className="loginsignup-btn">
            {isAdminLogin ? "Login as Admin" : (isLogin ? "Login" : "Continue")}
          </button>
        </form>

        {/* Admin Access Section - Only show on regular login page */}
        {isLogin && !isAdminLogin && (
          <div className="admin-access">
            <div className="admin-divider">
              <span>Admin Access</span>
            </div>
            <div className="admin-buttons">
              <button 
                type="button" 
                className="admin-btn demo-btn"
                onClick={handleAdminLoginClick}
              >
                <span className="icon">🔐</span>
                <span className="text">Admin Login</span>
              </button>
             
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;