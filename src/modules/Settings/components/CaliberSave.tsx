import React, { useEffect, useState } from 'react'
import { Button, Form, FormInstance, Input, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import CaliberRepository from '@repositories/caliber.repository';
import { ICaliberProps, ICaliberSave } from 'src/types/caliber.type';
import { toast } from 'react-toastify';

const caliberController = new CaliberRepository();

export function CaliberSave(props: ICaliberProps) {
  const {
      caliber = null,
      open,
      onCancel,
      onStore,
      onUpdate
  } = props

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (values: ICaliberSave) => {
    setLoading(true);
    try {
      let data = null;
      if(caliber){
        const response = await caliberController.update(values, caliber._id);
        data = response.data
      } else {
        const response = await caliberController.store(values);
        data = response.data
      }

      if(caliber){
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
    if(caliber && formRef.current){
      formRef.current.setFieldsValue({
        name: caliber.name
      })

    }
  }, [caliber])

  return (
    <Modal
        title={`${caliber ? `Edit ${caliber.name}` : 'Save caliber'}`}
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
