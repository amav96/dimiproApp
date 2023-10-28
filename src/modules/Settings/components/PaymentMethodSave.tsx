import React, { useEffect, useState } from 'react'
import { Button, Form, FormInstance, Input, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import PaymentMethodRepository from '@repositories/paymentMethod.repository';
import { IPaymentMethodProps, IPaymentMethodSave } from '@localTypes/paymentMethod.type';

const paymentMethodController = new PaymentMethodRepository();

export function PaymentMethodSave(props: IPaymentMethodProps) {
  const {
      paymentMethod = null,
      open,
      onCancel,
      onStore,
      onUpdate
  } = props

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (values: IPaymentMethodSave) => {
    setLoading(true);
    try {
      let data = null;
      if(paymentMethod){
        const response = await paymentMethodController.update(values, paymentMethod._id);
        data = response.data
      } else {
        const response = await paymentMethodController.store(values);
        data = response.data
      }

      if(paymentMethod){
        onUpdate(data)
      } else {
        onStore(data)
      }

      cancel()
    } catch (error : any) {

    } finally {
      setLoading(false);
    }
  };

  const cancel = () => {
    onReset()
    onCancel(false)
  }

  const formRef = React.useRef<FormInstance>(null);
  const onReset = () => {
    formRef.current?.resetFields();
  };

  useEffect(() => {
    if(paymentMethod && formRef.current){
      formRef.current.setFieldsValue({
        name: paymentMethod.name
      })

    }
  }, [paymentMethod])

  return (
    <Modal
        title={`${paymentMethod ? `Edit ${paymentMethod.name}` : 'Save paymentMethod'}`}
        centered
        open={open}
        onCancel={() => cancel()}
        footer={null}
      >
      <Form
        ref={formRef}
        onFinish={onSubmit}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input Name!' }]}
        >
          <Input
            size="large"
            placeholder="Name" />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            size="large"
            type="primary"
            block
            htmlType="submit"
            className="login-form-button">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
