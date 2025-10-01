import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false); // toggle login/signup
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // fake API response for now
      if (isLogin) {
        alert(`✅ Logged in as ${formData.email}`);
      } else {
        alert(`🎉 Account created for ${formData.name}`);
      }

      // clear form
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      alert("❌ Something went wrong, please try again!");
    }
  };

  return (
    <div className="loginsignup">
      <form className="loginsignup-container" onSubmit={handleSubmit}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>

        <div className="loginsignup-fields">
          {!isLogin && (
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

        <p className="loginsignup-login">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Sign up here</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login here</span>
            </>
          )}
        </p>

        {!isLogin && (
          <div className="loginsignup-agree">
            <input type="checkbox" id="agree" required />
            <p>
              By continuing, I agree to the <b>Terms of Use</b> &{" "}
              <b>Privacy Policy</b>.
            </p>
          </div>
        )}

        <button type="submit">{isLogin ? "Login" : "Continue"}</button>
      </form>
    </div>
  );
};

export default LoginSignup;
