import React, { useEffect, useState } from 'react'
import { Button, Form, FormInstance, Input, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import PackagingRepository from '@repositories/packaging.repository';
import { IPackagingProps, IPackagingSave } from '@localTypes/packaging.type';

const packagingController = new PackagingRepository();

export function PackagingSave(props: IPackagingProps) {
  const {
      packaging = null,
      open,
      onCancel,
      onStore,
      onUpdate
  } = props

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (values: IPackagingSave) => {
    setLoading(true);
    try {
      let data = null;
      if(packaging){
        const response = await packagingController.update(values, packaging._id);
        data = response.data
      } else {
        const response = await packagingController.store(values);
        data = response.data
      }

      if(packaging){
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
    if(packaging && formRef.current){
      formRef.current.setFieldsValue({
        name: packaging.name
      })

    }
  }, [packaging])

  return (
    <Modal
        title={`${packaging ? `Edit ${packaging.name}` : 'Save packaging'}`}
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
