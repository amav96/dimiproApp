import React, { useRef, useState } from "react";
import { Form, Button } from "@package";
import { Slot, GlobalInputs } from "@packageTypes";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationApi from "@repositories/auth.repository";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {setUser, setPermissions, setAccess } from '../../features/auth/authSlice'
import {  toast } from 'react-toastify';


const authController = new AuthenticationApi()
export function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
      customClass: 'c-mb-4'
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

  const [loading, setLoading] = useState<boolean>(false)
  const onSubmit = async (data: any) => {

    const { items } = data;
    setLoading(true);
    const response = await authController.login(items)
    setLoading(false);
    console.log(response)
    if(response.errors){
      toast(`🦄 ${response.errors.message || 'Contraseña o usuario incorrecto'}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      if(response.user){
        dispatch(setUser(response.user))
      }
      if(response.access){
        dispatch(setAccess(response.access))
      }
      if(response.permissions){
        dispatch(setPermissions(response.permissions))
      }
      navigate('/users')
    }

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
          <Button disabled={loading} customClass="btn-primary">Iniciar sesión</Button>
        </Form>
      }
    </div>
  );
}
