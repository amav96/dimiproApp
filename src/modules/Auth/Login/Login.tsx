import { useLocation } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

import "./Login.scss";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

export function Login() {
  const location = useLocation();

  const isLoginPath = location.pathname === "/login";
  const isForgotPasswordPath = location.pathname === "/forgot-password";

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="form-container__width">
          <h1 className="c-text-4xl c-mx-2">
            {isLoginPath && "Welcome!"}
            {isForgotPasswordPath && "Reset password."}
          </h1>
          <span className="c-mx-2 subtitle">
            {isLoginPath && "Please enter your credentials to login."}
            {isForgotPasswordPath && "Enter your email address to recover your password."}
          </span>
          {isLoginPath && <LoginForm />}
          {isForgotPasswordPath && <ForgotPasswordForm />}
        </div>
      </div>

      <div className="banner-login" />
    </div>
  );
}
