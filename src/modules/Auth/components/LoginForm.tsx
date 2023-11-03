import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationRepository from "@repositories/auth.repository";
import { useAppSelector, useAppDispatch } from "@hooks/hooks";
import {setUser, setPermissions, setToken } from '@store/auth/authSlice'
import {  toast } from 'react-toastify';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';


const authController = new AuthenticationRepository()
export function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await authController.login(values)
     
      setLoading(false);
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

    } catch (error : any) {
      if(!error){
        setLoading(false);
        toast(`🦄 Has ocurred error in server`, {
          autoClose: 2000,
          });
      }else {

        setLoading(false);
        const { data } = error
        if(data?.errors){
          toast(`🦄 ${data.errors.message}`, {
            autoClose: 2000,
            });
        } else {
          toast(`🦄 You have not been able to log in`, {
            autoClose: 2000,
            });
        }
      }
    }
  };


  return (

    <div className="mt-4 mb-2 mx-2">
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          size="large"
          prefix={<LockOutlined  className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Link to="/forgot-password" className="login-form-forgot">
        Forgot your password?
        </Link>
      </Form.Item>

      <Form.Item>
        <Button
          loading={loading}
          size="large"
          type="primary"
          block
          htmlType="submit"
          className="login-form-button">
          Login
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
}
