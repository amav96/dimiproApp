import $http from "@services/AxiosInstance";
import baseApiUrl from "@services/BaseApiUrl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Layout } from "../../../components/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../assets/styles/_restore-password.scss'
import { Input, Form, Col, Button } from "antd";
import { LockOutlined } from '@ant-design/icons';

const RestorePassword = () => {
  const [isTokenValid, setisTokenValid] = useState(false);
  const [email, setEmail] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await $http.post(`${baseApiUrl}/api/v1/verify-token`, {
          token,
        });
        setEmail(response.data.email);

        setisTokenValid(true);
      } catch (error) {
        console.error("error verifying token:", error);
        setisTokenValid(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setisTokenValid(false);
    }
  }, [token]);

  const onSubmit = async (formValues: any) => {

    try {
      if (formValues.password !== formValues.confirmPassword) {
        toast.error("Passwords do not match", {
          autoClose: 4000,
          theme: "dark",
        });
        return;
      }

      await $http.put(`${baseApiUrl}/api/v1/users/update-password`, {
        email,
        newPassword: formValues.password,
      });

      toast.success("Password updated correctly.", {
        autoClose: 4000,
        theme: "dark",
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Restore password" customClass="restore-password-view">
      {isTokenValid ? (
        <>
        <Form
        name="normal_login"
        className="login-form"
        onFinish={onSubmit}
        >
          <Col className="mt-2" span={12}>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              >
              <Input
                size="large"
                prefix={<LockOutlined  className="site-form-item-icon" />}
                type="password"
                placeholder="password"
              />
            </Form.Item>
          </Col>
          <Col className="mt-2" span={12}>
            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: 'Please input your confirmPassword!' }]}
              >
              <Input
                size="large"
                prefix={<LockOutlined  className="site-form-item-icon" />}
                type="confirmPassword"
                placeholder="confirmPassword"
              />
            </Form.Item>
          </Col>
          <Col className="mt-2" span={12}>
            <Form.Item>
              <Button
                  size="large"
                  type="primary"
                  block
                  htmlType="submit"
                  >
                  Save
              </Button>
            </Form.Item>
          </Col>
        </Form>
        </>
      ) : (
        <>
          <h1
            style={{
              color: "white",
              fontSize: "16px",
            }}
          >
            Invalid or expired token. Please try again
          </h1>
          <Button >
            <Link to="/forgot-password" className="link-login">
              Back
            </Link>
          </Button>
        </>
      )}
    </Layout>
  );
};

export default RestorePassword;
