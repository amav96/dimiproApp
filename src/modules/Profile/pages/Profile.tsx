import React, { useEffect, useState } from 'react'
import ProfileImg from "../assets/images/profile.svg";
import "../assets/styles/_profile.scss";
import { Col, Form, Input, Row, Select, FormInstance, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { RootState } from '@store/store';
import { selectUser } from "@store/auth/authSlice";
import { IUser } from '@localTypes/user.type';
import UserRepository from '@repositories/user.repository';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { useTheme } from '@hooks/useTheme';
import { Layout } from 'antd';

const userController = new UserRepository();

export function Profile() {

  const prefixs = useAppSelector((state: RootState) => state.dataProviders.prefixs);
  const userRedux = useAppSelector(selectUser);
  const [user, setUser] = useState<IUser>(userRedux);
  const dispatch = useAppDispatch()

  const formRef = React.useRef<FormInstance>(null);

  useEffect(() => {
    if(user && formRef.current){
        formRef.current.setFieldsValue({
            ...user
        })
    }
  }, [user])

  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (formValues: any) => {

    const updatedUserData: any = {
        ...user,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        prefix: formValues.prefix,
      };
    try {
        const response = await userController.update(updatedUserData, user._id);
        setUser(response.data)
        dispatch({ type: "auth/setUser", payload: response.data });
        toast.success("User updated successfully", {
            autoClose: 3000,
            theme: "dark",
          });
    } catch (error) {
        toast.error("Failed to update user.", {
            autoClose: 3000,
            theme: "dark",
          });
    }
  }
  const {  Content } = Layout;
  const { colorBgContainer }= useTheme()

  return (
    <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <h1 className={`text-2xl`}>Profile</h1>
        <div className="container_profile">
            <Form
            ref={formRef}
            onFinish={onSubmit}
            autoComplete="off"
            layout="vertical"
            >
                <Row gutter={10} >
                    <Col span={15} >
                        <Form.Item
                        name="firstName"
                        rules={[{ required: true, message: 'Please input First name!' }]}
                        >
                        <Input
                            size="large"
                            placeholder="First name" />
                        </Form.Item>
                    </Col>
                    <Col span={15} >
                        <Form.Item
                        name="lastName"
                        rules={[{ required: true, message: 'Please input Last name!' }]}
                        >
                        <Input
                        size="large"
                        placeholder="Last name" />
                        </Form.Item>
                    </Col>
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
                    <Col span={15}>
                    <Form.Item
                        name="prefixCode"
                    >
                        <Select
                        showSearch
                        style={{ width: '100%' }}
                        size="large"
                        placeholder="Prefix|Code"
                        options={prefixs.map((c : any) => ({
                            ...c,
                            label: c.fullName,
                            value: c.id
                        }))}
                        optionFilterProp="name"
                        />
                    </Form.Item>
                    </Col>

                    <Col span={15}>
                        <Form.Item
                        name="phoneNumber"
                        >
                        <Input
                            size="large"
                            type="number"
                            placeholder="PhoneNumber" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-2" span={12}>
                        <Link to="/forgot-password" className="link_change_password">
                            Change Password
                        </Link>
                    </Col>
                </Row>
                <Row gutter={10}>
                    
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
                            Save
                        </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <img src={ProfileImg} alt="profile" className="profile_img" />
        </div>

    </Content>
  )
}
