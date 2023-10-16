import React, { useEffect, useState } from 'react'
import { Button, Form, FormInstance, Input, Modal } from 'antd';
import ProductRepository from '@repositories/product.repository';
import { IProductProps, IProductSave } from 'src/types/product.type';

const productController = new ProductRepository();

export function ProductSave(props: IProductProps) {
  const {
      product = null,
      open,
      onCancel,
      onStore,
      onUpdate
  } = props

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (values: IProductSave) => {
    setLoading(true);
    try {
      let data = null;
      if(product){
        const response = await productController.update(values, product._id);
        data = response.data
      } else {
        const response = await productController.store(values);
        data = response.data
      }

      if(product){
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
    if(product && formRef.current){
      formRef.current.setFieldsValue({
        name: product.name
      })

    }
  }, [product])

  return (
    <Modal
        title={`${product ? `Edit ${product.name}` : 'Save product'}`}
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
