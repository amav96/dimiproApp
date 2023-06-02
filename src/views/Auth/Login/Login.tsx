import { useLocation } from "react-router-dom";
import { LoginForm } from "../../../components/Auth/LoginForm";

import "./Login.scss";
import { ForgotPasswordForm } from "../../../components/Auth/ForgotPasswordForm";

export function Login() {
  const location = useLocation();

  const isLoginPath = location.pathname === "/login";
  const isForgotPasswordPath = location.pathname === "/forgot-password";

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="form-container__width">
          <h1 className="c-text-4xl c-mx-2">
            {isLoginPath && "¡Bienvenido!"}
            {isForgotPasswordPath && "Recuperar contraseña"}
          </h1>
          <span className="c-mx-2 subtitle">
            {isLoginPath && "Por favor ingresa tus credenciales para iniciar sesión."}
            {isForgotPasswordPath && "Ingresa tu correo para recuperar tu contraseña."}
          </span>
          {isLoginPath && <LoginForm />}
          {isForgotPasswordPath && <ForgotPasswordForm />}
        </div>
      </div>

      <div className="banner-login" />
    </div>
  );
}
