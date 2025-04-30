import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [animationClass, setAnimationClass] = useState("");

  // Login form state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupFullName,   setSignupFullName]   = useState("");
  const [signupUsername,   setSignupUsername]   = useState("");
  const [signupEmail,      setSignupEmail]      = useState("");
  const [signupPassword,   setSignupPassword]   = useState("");
  const [signupRole,       setSignupRole]       = useState("employee");
  const [signupDepartment, setSignupDepartment] = useState("");

  // Toggle between sign-up and login forms
  const handleSignupClick = () => setAnimationClass("bounceLeft");
  const handleLoginClick  = () => setAnimationClass("bounceRight");

  // Sign-up handler
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/signup", {
        fullName:   signupFullName,
        username:   signupUsername,
        email:      signupEmail,
        password:   signupPassword,
        role:       signupRole,
        department: signupDepartment
      });
      toast.success(data.message, { position: "top-center" });
      // Optionally switch back to login form:
      setAnimationClass("bounceRight");
    } catch (err) {
      toast.error(err.response?.data?.message || "Sign up failed", {
        position: "top-center"
      });
    }
  };

  // Login handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/login", {
        username: loginUsername,
        password: loginPassword
      });
      const userData = {
        token:    data.token,
        role:     data.role,
        username: data.username
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success(data.message, { position: "top-center" });
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", {
        position: "top-center"
      });
    }
  };

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">Don't have an account?</h2>
            <p className="user_unregistered-text">Create an account now!</p>
            <button
              className="user_unregistered-signup"
              onClick={handleSignupClick}
            >Sign up</button>
          </div>
          <div className="user_options-registered">
            <h2 className="user_registered-title">Have an account?</h2>
            <p className="user_registered-text">Login now.</p>
            <button
              className="user_registered-login"
              onClick={handleLoginClick}
            >Login</button>
          </div>
        </div>

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
                    required autoFocus
                    value={loginUsername}
                    onChange={e => setLoginUsername(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
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
                    onChange={e => setSignupFullName(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Username"
                    className="forms_field-input"
                    required
                    value={signupUsername}
                    onChange={e => setSignupUsername(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    required
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    required
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <select
                    value={signupRole}
                    onChange={e => setSignupRole(e.target.value)}
                    className="forms_field-input"
                    required
                    style={{ borderTop: "none", borderRight: "none", borderLeft: "none" }}
                  >
                    <option value="" disabled>Select Role</option>
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
                    onChange={e => setSignupDepartment(e.target.value)}
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
      <ToastContainer />
    </section>
  );
}

export default Login;
