import React from "react";
import { LoginForm } from "../../../components/Auth/LoginForm";

import "./Login.scss";

export function Login() {
  return (
    <div className="login-container">
      <div className="form-container">
        <div className="form-container__width">
          <h1 className="c-text-4xl c-mx-2">¡Bienvenido!</h1>
          <span className="c-mx-2 subtitle">
            Por favor ingresa tus credenciales para
            iniciar sesión.
          </span>
          <LoginForm />
        </div>
      </div>

      <div className="banner-login" />
    </div>
  );
}
