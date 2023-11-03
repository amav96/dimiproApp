import React, { useEffect, useState } from 'react'
import { Button, Form, FormInstance, Input, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import CategoryRepository from '@repositories/category.repository';
import { ICategoryProps, ICategorySave } from '@localTypes/category.type';
import { toast } from 'react-toastify';

const categoryController = new CategoryRepository();

export function CategorySave(props: ICategoryProps) {
  const {
      category = null,
      open,
      onCancel,
      onStore,
      onUpdate
  } = props

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (values: ICategorySave) => {
    setLoading(true);
    try {
      let data = null;
      if(category){
        const response = await categoryController.update(values, category._id);
        data = response.data
      } else {
        const response = await categoryController.store(values);
        data = response.data
      }

      if(category){
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
    if(category && formRef.current){
      formRef.current.setFieldsValue({
        name: category.name
      })

    }
  }, [category])

  return (
    <Modal
        title={`${category ? `Edit ${category.name}` : 'Save category'}`}
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
