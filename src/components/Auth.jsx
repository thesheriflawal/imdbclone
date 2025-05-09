import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import GoogleAuth from "../GoogleAuth";
import "../styles/Auth.css";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { setUser } = useAuth(); 
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setUser({ username: formData.username || "User" });
    alert(`${isSignup ? "Signup" : "Login"} successful`);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

        {/* 👇 Email/Password Form */}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                👁️
              </span>
            </div>
          </div>
          {isSignup && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className="eye-icon"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  👁️
                </span>
              </div>
            </div>
          )}
          <button className="btn" type="submit">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* 👇 Divider */}
        <div className="divider">OR</div>

        {/* 👇 Google Auth Button */}
        <GoogleAuth />

        {/* 👇 Toggle Sign In/Sign Up */}
        <div className="toggle-form">
          <span>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button onClick={() => setIsSignup((prev) => !prev)}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
