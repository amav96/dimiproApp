import React, { useRef, useState } from "react";
import { Form, Button } from "@package";
import { Slot, GlobalInputs } from "@packageTypes";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationRepository from "@repositories/auth.repository";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {setUser, setPermissions, setToken } from '@store/auth/authSlice'
import {  toast } from 'react-toastify';


const authController = new AuthenticationRepository()
export function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [inputs, setInputs] = useState<Array<GlobalInputs | Slot>>([
    {
      key: "email",
      placeholder: "Email",
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

    if (!items.email || !items.password) {
      toast.error('Please complete the required fields.', {
        autoClose: 4000,
        theme: "dark",

      });
      return;
    }
    setLoading(true);
    const response = await authController.login(items)
    setLoading(false);    
    if(response.errors){
      toast(`🦄 ${response.errors.message}`, {
        autoClose: 2000,
        });
    } else {
      if(response.user){
        dispatch(setUser(response.user))
      }
      if(response.token){
        dispatch(setToken(response.token))
      }
      if(response.permissions){
        dispatch(setPermissions(response.permissions))
      }
      navigate('/list-contracts')
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
            Forgot your password?
          </Link>
          <Button disabled={loading} customClass="btn-primary">Login</Button>
        </Form>
      }
    </div>
  );
}
