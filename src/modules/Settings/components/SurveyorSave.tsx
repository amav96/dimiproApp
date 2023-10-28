import React, { useEffect, useState } from 'react'
import { Button, Form, FormInstance, Input, Modal } from 'antd';
import SurveyorRepository from '@repositories/surveyor.repository';
import { ISurveyorProps, ISurveyorSave } from '@localTypes/surveyor.type';

const surveyorController = new SurveyorRepository();

export function SurveyorSave(props: ISurveyorProps) {
  const {
      surveyor = null,
      open,
      onCancel,
      onStore,
      onUpdate
  } = props

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (values: ISurveyorSave) => {
    setLoading(true);
    try {
      let data = null;
      if(surveyor){
        const response = await surveyorController.update(values, surveyor._id);
        data = response.data
      } else {
        const response = await surveyorController.store(values);
        data = response.data
      }

      if(surveyor){
        onUpdate(data)
      } else {
        onStore(data)
      }

      cancel()
    } catch (error : any) {
      console.log(error)
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
    if(surveyor && formRef.current){
      formRef.current.setFieldsValue({
        name: surveyor.name
      })

    }
  }, [surveyor])

  return (
    <Modal
        title={`${surveyor ? `Edit ${surveyor.name}` : 'Save surveyor'}`}
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
