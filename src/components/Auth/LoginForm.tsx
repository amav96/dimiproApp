import React, { useState } from "react";
import { Form, Button } from "@package";
import { Slot, GlobalInputs } from "@packageTypes";
import { Link } from "react-router-dom";
import AuthenticationApi from "@services/api/authApi";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {setUser} from '../../features/auth/authSlice'

const authController = new AuthenticationApi()
export function LoginForm() {

  const dispatch = useAppDispatch()

  const [inputs, setInputs] = useState<Array<GlobalInputs | Slot>>([
    {
      key: "email",
      placeholder: "Email",
      title: "email",
      name: "email",
      value: "",
      type: "email",
      validations: {
        rules: {
          required: true,
        },
      },
    },
    {
      key: "password",
      placeholder: "Password",
      name: "password",
      value: null,
      type: "password",
      validations: {
        rules: {
          required: true,
        },
      },
    },
  ]);

  const onSubmit = async (data: any) => {
    const { items } = data;
    const response = await authController.login(items)
    if(response.user){
      dispatch(setUser(response.user))
    }
    console.log({response})
  };

  

  return (
    <div className="c-mt-4 c-mb-2 c-mx-2">
      {
        <Form
          inputs={inputs}
          onSubmit={onSubmit}
        >
          <Link to="/forgot-password" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </Link>
          <Button customClass="btn-primary">Iniciar sesión</Button>
        </Form>
      }
    </div>
  );
}
