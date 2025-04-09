import { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import "../styles/Auth.css"; // Ensure this file includes styling

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup/login
  const [showPassword, setShowPassword] = useState(false); // Show password state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Show confirm password state
=======
import GoogleAuth from "../GoogleAuth";
import "../styles/Auth.css";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
>>>>>>> 219974154f78661f680e491d6d7402eb9e036266
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
<<<<<<< HEAD
    confirmPassword: "", // Used for signup only
  });
  const [modalMessage, setModalMessage] = useState(""); // Modal message state
  const [modalType, setModalType] = useState(""); // 'success' or 'error' for modal type
=======
    confirmPassword: "",
  });

>>>>>>> 219974154f78661f680e491d6d7402eb9e036266
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
<<<<<<< HEAD
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      setModalType("error");
      setModalMessage("Passwords do not match!");
      return;
    }

    // Handle Signup Logic
    if (isSignup) {
      const existingUser = JSON.parse(localStorage.getItem("user"));
      if (existingUser && existingUser.email === formData.email) {
        setModalType("error");
        setModalMessage("User already exists with this email.");
        return;
      }

      // Store user info in localStorage
      const newUser = { username: formData.username, email: formData.email, password: formData.password };
      localStorage.setItem("user", JSON.stringify(newUser));

      setModalType("success");
      setModalMessage("Sign-up successful!");
      setTimeout(() => navigate("/"), 1500); // Redirect to homepage after successful signup
    } else {
      // Handle Login Logic
      const existingUser = JSON.parse(localStorage.getItem("user"));
      if (!existingUser || existingUser.email !== formData.email || existingUser.password !== formData.password) {
        setModalType("error");
        setModalMessage("Invalid login credentials.");
        return;
      }

      setModalType("success");
      setModalMessage("Login successful!");
      setTimeout(() => navigate("/"), 1500); // Redirect to homepage after successful login
    }
  };

  const toggleForm = () => {
    setIsSignup((prev) => !prev); // Toggle between Signup and Login
    setModalMessage(""); // Reset modal message when switching forms
=======
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`${isSignup ? "Signup" : "Login"} successful`);
    navigate("/");
>>>>>>> 219974154f78661f680e491d6d7402eb9e036266
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
<<<<<<< HEAD
        <h2>{isSignup ? "Sign Up" : "Log In"}</h2>

        {/* Form to input data */}
=======
        <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

        {/* 👇 Email/Password Form */}
>>>>>>> 219974154f78661f680e491d6d7402eb9e036266
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
<<<<<<< HEAD

=======
>>>>>>> 219974154f78661f680e491d6d7402eb9e036266
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
<<<<<<< HEAD

=======
>>>>>>> 219974154f78661f680e491d6d7402eb9e036266
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
<<<<<<< HEAD

=======
>>>>>>> 219974154f78661f680e491d6d7402eb9e036266
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
<<<<<<< HEAD

          <button className="btn" type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
        </form>

        {/* Toggle between Login and Signup */}
=======
          <button className="btn" type="submit">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* 👇 Divider */}
        <div className="divider">OR</div>

        {/* 👇 Google Auth Button */}
        <GoogleAuth />

        {/* 👇 Toggle Sign In/Sign Up */}
>>>>>>> 219974154f78661f680e491d6d7402eb9e036266
        <div className="toggle-form">
          <span>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </span>
<<<<<<< HEAD
          <button onClick={toggleForm}>
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </div>
      </div>

      {/* Modal for displaying alert */}
      {modalMessage && (
        <div className={`modal ${modalType}`}>
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button
              onClick={() => setModalMessage("")} // Close modal
              className="modal-close-btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
=======
          <button onClick={() => setIsSignup((prev) => !prev)}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
>>>>>>> 219974154f78661f680e491d6d7402eb9e036266
    </div>
  );
};

export default Auth;
