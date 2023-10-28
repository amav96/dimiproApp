import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Col, Form, FormInstance, Input, Modal, Row, Select, Breakpoint, Grid } from 'antd';
import UserRepository from '@repositories/user.repository';
import { IPropsUser, ISaveUser } from 'src/types/user.type';
import { useAppSelector } from '@hooks/hooks';
import { RootState } from '@store/store';
import { ICompany } from 'src/types/company.type';
import { toast } from 'react-toastify';
import { IRole } from '../../../types/role.type';

const userController = new UserRepository();

export function UserSave(props: IPropsUser) {
  const {
      user = null,
      open,
      onCancel,
      onStore,
      onUpdate
  } = props

  const roles = useAppSelector((state: RootState) => state.dataProviders.roles);
  const companies = useAppSelector((state: RootState) => state.dataProviders.companies);
  const prefixs = useAppSelector((state: RootState) => state.dataProviders.prefixs);

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (values: ISaveUser) => {
    let formValues = {...values};

    setLoading(true);
    try {
      let data = null;
      if(user){
        const response = await userController.update(formValues, user._id);
        data = response.data
      } else {
        const response = await userController.store(formValues);
        data = response.data
      }
      toast(`Successfully saved`, {
        autoClose: 2000,
        theme: "dark",
      });

      if(user){
        onUpdate(data)
      } else {
        onStore(data)
      }

      cancel()
    } catch (error : any) {
        toast.error(`An error has ocurred`, {
          autoClose: 5000,
          theme: "colored",
        });
    } finally {
      setLoading(false);
    }
  };

  const cancel = () => {
    onReset()
    onCancel(false)
  }

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const colSpan = screens.xs ? 24 : 12
  const formRef = React.useRef<FormInstance>(null);
  const onReset = () => {
    setUpdatePassword(false);
    formRef.current?.resetFields();
  };

  useEffect(() => {
    completeForm()
  }, [user])

  const completeForm = () => {
    if(user && formRef.current){
      formRef.current.setFieldsValue({
        ...user,
        ...(user.company ? { company: user.company._id } : {}),
        ...(user.role ? { role: user.role._id } : {})
      })
    }
  }

  const [updatePassword , setUpdatePassword] = useState<any>(false);

  return (
    <Modal
        title={`${user ? `Edit ${user.firstName}` : 'Save user'}`}
        centered
        open={open}
        onCancel={() => cancel()}
        footer={null}
      >
      <Form
        ref={formRef}
        onFinish={onSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={10} >
            <Col span={colSpan} >
                <Form.Item
                name="firstName"
                label="FirstName"
                rules={[{ required: true, message: 'Please input FirstName!' }]}
                >
                <Input
                    size="large"
                    placeholder="FirstName" />
                </Form.Item>
            </Col>

            <Col span={colSpan} >
                <Form.Item
                name="lastName"
                label="LastName"
                rules={[{ required: true, message: 'Please input LastName!' }]}
                >
                <Input
                    size="large"
                    placeholder="LastName" />
                </Form.Item>
            </Col>

            <Col span={colSpan}>
                <Form.Item
                name="email"
                label="Email"
                rules={[{ type: 'email' }, {required: true, message: 'Please input Email!'}]}
                >
                <Input
                    size="large"
                    placeholder="Email" />
                </Form.Item>
            </Col>

            <Col span={colSpan}>
                <Form.Item
                name="role"
                label="Roles"
                rules={[{required: true, message: 'Please select role!'}]}
                >
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Role"
                    options={roles && Array.isArray(roles) ? roles.map((c : IRole) => ({
                    ...c,
                    label: c.name,
                    value: c._id
                    })) : []}
                    // @ts-ignore
                    autoComplete="none"
                    allowClear
                    optionFilterProp="name"
                >
                </Select>
                </Form.Item>
            </Col>

            <Col span={colSpan}>
              <Form.Item
              name="company"
              label="Company"
              rules={[{required: true, message: 'Please select company!'}]}
              >
              <Select
                showSearch
                style={{ width: '100%' }}
                size="large"
                placeholder="Company"
                options={companies && Array.isArray(companies) ? companies.map((c : ICompany) => ({
                ...c,
                label: c.name,
                value: c._id
                })) : []}
                // @ts-ignore
                autoComplete="none"
                allowClear
                optionFilterProp="name"
              />
              </Form.Item>
            </Col>

            <Col span={colSpan}>
              <Form.Item
                name="prefixCode"
                label="Prefix +58"
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

            <Col span={colSpan}>
                <Form.Item
                name="phoneNumber"
                label="phone"
                >
                <Input
                    size="large"
                    type="number"
                    placeholder="PhoneNumber" />
                </Form.Item>
            </Col>
        </Row>

        <Row>
          {
            user &&
            <Checkbox
            checked={updatePassword}
            onChange={(value) => setUpdatePassword(value.target.checked)}
            >
              ¿Update password?
            </Checkbox>
          }
        </Row>
        <Row gutter={10}>
          {
            (!user || updatePassword) &&
            (<>
              <Col span={colSpan}>
                <Form.Item
                name="password"
                label="Password"
                // @ts-ignore
                autoComplete="new-password"
                rules={[
                  (
                    (!user ||  updatePassword) ? { required: true, message: 'Please input password!' } : {}
                  )
                ]}
                >
                <Input.Password
                  size="large"
                  placeholder="Password" />
                </Form.Item>
              </Col>
              <Col span={colSpan}>
                <Form.Item
                name="confirmPassword"
                label="Confirm password"
                rules={[
                  (
                    (!user ||  updatePassword) ? { required: true, message: 'Please input confirm Password!' } : {}
                  )
                ]}
                >
                <Input.Password
                  size="large"
                  placeholder="Confirm password" />
                </Form.Item>
              </Col>
            </>)

          }
        </Row>
        <Row gutter={10}>
          <Col className="mt-2" span={12}>
            <Form.Item>
            <Button
                onClick={cancel}
                size="large"
                block
                type="default"
                >
                Cancel
            </Button>
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
                  Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
