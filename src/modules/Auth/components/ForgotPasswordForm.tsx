import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import $http from "@services/AxiosInstance";
import baseApiUrl from "@services/BaseApiUrl";
import { Button, Col, Form, Input } from "antd";

export function ForgotPasswordForm() {

  const [loading, setLoading] = useState<boolean>(false)
  const onSubmit = async (formValues: any) => {
    try {

      setLoading(true);
      const response = await $http.post(
        `${baseApiUrl}/api/v1/restore-password`,
        {
          email: formValues.email,
        }
      );
      setLoading(false);
      if (response.status === 200) {
        toast.success(
          "An email has been sent to reset your password.",
          {
            autoClose: 4000,
            theme: "dark",
          }
        );
      } else {
        toast.error("There was an error sending the email", {
          autoClose: 4000,
          theme: "dark",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("There was an error sending the email", {
        autoClose: 4000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="mt-4 mb-2 mx-2">
      {
        <Form
        onFinish={onSubmit}
        autoComplete="off"
        layout="vertical"
        >
          <Col span={15} >
            <Form.Item
            name="email"
            rules={[{ type: 'email' }, { required: true, message: 'Please input your Email!' }]}
            >
            <Input
            size="large"
            type="email"
            placeholder="Email" />
            </Form.Item>
          </Col>
          <Col className="mt-2" span={12}>
            <Form.Item>
              <Button
                  loading={loading}
                  disabled={loading}
                  size="large"
                  type="primary"
                  block
                  htmlType="submit"
                  >
                  Recover password
              </Button>
            </Form.Item>
          </Col>

          <Link to="/login" className="link-login">
          Already have an account? <span>Sign in</span>
          </Link>
        </Form>

      }
    </div>
  );
}
