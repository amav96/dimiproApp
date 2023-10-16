import React, { useEffect, useState } from 'react'
import { Button, Form, FormInstance, Input, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import CurrencyRepository from '@repositories/currency.repository';
import { ICurrencyProps, ICurrencySave } from 'src/types/currency.type';

const currencyController = new CurrencyRepository();

export function CurrencySave(props: ICurrencyProps) {
  const {
      currency = null,
      open,
      onCancel,
      onStore,
      onUpdate
  } = props

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (values: ICurrencySave) => {
    setLoading(true);
    try {
      let data = null;
      if(currency){
        const response = await currencyController.update(values, currency._id);
        data = response.data
      } else {
        const response = await currencyController.store(values);
        data = response.data
      }

      if(currency){
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
    if(currency && formRef.current){
      formRef.current.setFieldsValue({
        name: currency.name
      })

    }
  }, [currency])

  return (
    <Modal
        title={`${currency ? `Edit ${currency.name}` : 'Save currency'}`}
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

        <Form.Item
          name="symbol"
          rules={[{ required: true, message: 'Please input Symbol!' }]}
        >
          <Input
            size="large"
            placeholder="Symbol" />
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
