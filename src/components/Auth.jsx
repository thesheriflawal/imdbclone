import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

    if (isSignup) {
      // Check if user already exists (based on email)
      const existingUser = JSON.parse(localStorage.getItem(formData.email));
      if (existingUser) {
        // Show modal if user exists
        setModalMessage("This email is already registered. Please log in.");
        setModalVisible(true);
        return;
      }

      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        setModalMessage("Passwords do not match!");
        setModalVisible(true);
        return;
      }

      // Save user to local storage
      localStorage.setItem(formData.email, JSON.stringify(formData));
      setModalMessage("Signup successful!");
      setModalVisible(true);
      navigate("/");
    } else {
      // If user is logging in, check if user exists
      const existingUser = JSON.parse(localStorage.getItem(formData.email));
      if (existingUser && existingUser.password === formData.password) {
        setModalMessage("Login successful!");
        setModalVisible(true);
        navigate("/");
      } else {
        setModalMessage("Invalid credentials or user not found.");
        setModalVisible(true);
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
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

      {/* 👇 Modal for Alerts */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
