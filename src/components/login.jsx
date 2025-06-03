import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

function Login({ setUser }) {
  const navigate = useNavigate();

  // Panel animation
  const [animationClass, setAnimationClass] = useState("");

  // Login form state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupFullName, setSignupFullName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("employee");
  const [signupDepartment, setSignupDepartment] = useState("");

  // Manager-auth modal state
  const [showManagerAuth, setShowManagerAuth] = useState(false);
  const [managerPassInput, setManagerPassInput] = useState("");

  // Handlers to show each panel
  const handleLoginClick = () => {
    setAnimationClass("bounceRight");
  };
  const handleSignupClick = () => {
    setShowManagerAuth(true);
  };

  // Modal confirm
  const handleManagerConfirm = () => {
    if (managerPassInput === "password") {
      setShowManagerAuth(false);
      setManagerPassInput("");
      setAnimationClass("bounceLeft");
    } else {
      toast.error("Incorrect manager password", { position: "top-center" });
    }
  };
  const handleManagerCancel = () => {
    setShowManagerAuth(false);
    setManagerPassInput("");
  };

  // Signup submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://dashboard-frontenddd.onrender.com/api/signup", {
        fullName: signupFullName,
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
        role: signupRole,
        department: signupDepartment,
      });
      toast.success(data.message, { position: "top-center" });
      setAnimationClass("bounceRight");
    } catch (err) {
      toast.error(err.response?.data?.message || "Sign up failed", {
        position: "top-center",
      });
    }
  };

  // Login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/login", {
        username: loginUsername,
        password: loginPassword,
      });
      const userData = {
        token: data.token,
        role: data.role,
        username: data.username,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success(data.message, { position: "top-center" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", {
        position: "top-center",
      });
    }
  };

  return (
    <section className="user">
      <div className="user_options-container">
        {/* Left side: prompts */}
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">Don't have an account?</h2>
            <p className="user_unregistered-text">
              Create an account now!
            </p>
            <button
              className="user_unregistered-signup"
              onClick={handleSignupClick}
            >
              Sign up
            </button>
          </div>
          <div className="user_options-registered">
            <h2 className="user_registered-title">Have an account?</h2>
            <p className="user_registered-text">Login now.</p>
            <button
              className="user_registered-login"
              onClick={handleLoginClick}
            >
              Login
            </button>
          </div>
        </div>

        {/* Right side: forms */}
        <div className={`user_options-forms ${animationClass}`}>
          {/* —— Login Form —— */}
          <div className="user_forms-login">
            <h2 className="forms_title">Login</h2>
            <form className="forms_form" onSubmit={handleLoginSubmit}>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Username"
                    className="forms_field-input"
                    required
                    autoFocus
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <button type="button" className="forms_buttons-forgot">
                  Forgot password?
                </button>
                <input
                  type="submit"
                  value="Log In"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>

          {/* —— Sign Up Form —— */}
          <div className="user_forms-signup">
            <h2 className="forms_title">Sign Up</h2>
            <form className="forms_form" onSubmit={handleSignupSubmit}>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="forms_field-input"
                    required
                    value={signupFullName}
                    onChange={(e) => setSignupFullName(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Username"
                    className="forms_field-input"
                    required
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <select
                    value={signupRole}
                    onChange={(e) => setSignupRole(e.target.value)}
                    className="forms_field-input"
                    required
                    style={{ borderTop: "none", borderRight: "none", borderLeft: "none" }}
                  >
                    <option value="" disabled >
                      Select Role
                    </option>
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="sales">Sales</option>
                    <option value="marketing">Marketing</option>
                    <option value="hr">Human Resources</option>
                    <option value="finance">Finance</option>
                    <option value="it">IT</option>
                    <option value="operations">Operations</option>
                    <option value="admin">Admin</option>
                    <option value="support">Support</option>
                  </select>
                </div>
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Department"
                    className="forms_field-input"
                    required
                    value={signupDepartment}
                    onChange={(e) => setSignupDepartment(e.target.value)}
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input
                  type="submit"
                  value="Sign up"
                  className="forms_buttons-action"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Manager-auth Modal */}
      {showManagerAuth && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Manager Authorization</h3>
            <p>Enter manager password to proceed:</p>
            <input
              type="password"
              className="modal-input"
              placeholder="Manager Password"
              value={managerPassInput}
              onChange={(e) => setManagerPassInput(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleManagerCancel}>Cancel</button>
              <button onClick={handleManagerConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </section>
);

}

export default Login;
