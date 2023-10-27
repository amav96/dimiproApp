import React, { useState } from 'react'
import { useAppSelector } from '@hooks/hooks';
import { RootState } from '@store/store';
import { Upload, Button, Col, Form, FormInstance, Input, Modal, Row, Select, Breakpoint, Grid, DatePicker } from 'antd';
import { ICompany } from '../../../types/company.type';
import {  UploadOutlined, UsergroupDeleteOutlined, LineHeightOutlined, InboxOutlined } from '@ant-design/icons';
import { IProduct } from '../../../types/product.type';
import { IPackaging } from '../../../types/packaging.type';
import { ICurrency } from '../../../types/currency.type';
import { IPaymentMethod } from '../../../types/paymentMethod.type';
import { ISurveyor } from '../../../types/surveyor.type';
import dayjs from 'dayjs';
import { IContractSave } from '../../../types/contract.type';
import ContractRepository from '@repositories/contract.repository';
import { toast } from 'react-toastify';

const contractController = new ContractRepository();
export  function ContractSave() {

    const { TextArea } = Input;

    const products = useAppSelector((state: RootState) => state.dataProviders.products);
    const companies = useAppSelector((state: RootState) => state.dataProviders.companies);
    const categories = useAppSelector((state: RootState) => state.dataProviders.categories);
    const calibers = useAppSelector((state: RootState) => state.dataProviders.calibers);
    const packagings = useAppSelector((state: RootState) => state.dataProviders.packagings);
    const paymentMethods = useAppSelector((state: RootState) => state.dataProviders.paymentMethods);
    const surveyors = useAppSelector((state: RootState) => state.dataProviders.surveyors);
    const currencies = useAppSelector((state: RootState) => state.dataProviders.currencies);

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const colSpan = screens.lg ? 8 : screens.sm ? 12 : screens.xs ? 24 : 8
    const formRef = React.useRef<FormInstance>(null);
    const monthFormat = 'YYYY/MM';

    const [loading, setLoading] = useState<boolean>(false)
    const onSubmit = async (values: IContractSave) => {
        let formValues = {...values}
        formValues.shippingDate = dayjs(values.shippingDate).format(monthFormat)
        if(formValues.documents.length > 0){
            formValues.documents = formValues.documents.map((file: any) => file.originFileObj)
        }

        const formData = new FormData();

        for (const key in formValues) {
        let keyValue : any = formValues[key as keyof object]
          if (key === "documents") {
            console.log(formValues.documents)
            formValues.documents.forEach((file: any, index: number) => {
                console.log({file})
              if (
                file.type.includes("image") ||
                file.type === "application/pdf"
              ) {
                formData.append(`documents[${index}]`, file);
              }
            });
          } else if (key === "calibers") {
            formValues.calibers.forEach((caliber: string, index: number) => {
              formData.append(`calibers[${index}]`, caliber);
            });
          } else if (keyValue) {
            formData.append(key, keyValue);
          }
        }

        try {
            setLoading(true);
            const response = await contractController.store(formData);
            toast(`Successfully saved`, {
                autoClose: 2000,
                theme: "dark",
              });
            onReset()
        } catch (error : any) {
            toast.error(`An error has ocurred`, {
                autoClose: 5000,
                theme: "colored",
            });
        } finally {
            setLoading(false);
        }
    }

    const onReset = () => {
        formRef.current?.resetFields();
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

  return (
    <div>
        <Form
        ref={formRef}
        onFinish={onSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={10} >

            <Col span={colSpan} >
                <Form.Item
                name="name"
                label="Contract name"
                rules={[{ required: true, message: 'Please input Contract name!' }]}
                >
                <Input
                    size="large"
                    placeholder="Contract name" />
                </Form.Item>
            </Col>

            <Col span={colSpan}>
                <Form.Item
                name="exporter"
                label="Exporter"
                rules={[{required: true, message: 'Please select exporter!'}]}
                >
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Exporter"
                    options={companies && Array.isArray(companies) ? 
                        companies.filter((company: ICompany) => company.exporter).map((c : ICompany) => ({
                    ...c,
                    label: c.name,
                    value: c._id
                    })) : []}
                    // @ts-ignore
                    autoComplete="none"
                    allowClear
                    optionFilterProp="name"
                    suffixIcon={<UsergroupDeleteOutlined />}
                >
                </Select>
                </Form.Item>
            </Col>

            <Col span={colSpan}>
                <Form.Item
                name="importer"
                label="Importer"
                rules={[{required: true, message: 'Please select importer!'}]}
                >
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Importer"
                    options={companies && Array.isArray(companies) ? 
                        companies.filter((company: ICompany) => company.importer).map((c : ICompany) => ({
                        ...c,
                        label: c.name,
                        value: c._id
                    })) : []}
                    // @ts-ignore
                    autoComplete="none"
                    allowClear
                    optionFilterProp="name"
                    suffixIcon={<UsergroupDeleteOutlined />}
                >
                </Select>
                </Form.Item>
            </Col>

            <Col span={colSpan}>
                <Form.Item
                name="product"
                label="Product"
                rules={[{required: true, message: 'Please select product!'}]}
                >
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Product"
                    options={products && Array.isArray(products) ? 
                        products.map((c : IProduct) => ({
                        ...c,
                        label: c.name,
                        value: c._id
                    })) : []}
                    // @ts-ignore
                    autoComplete="none"
                    allowClear
                    optionFilterProp="name"
                    suffixIcon={<LineHeightOutlined />}
                >
                </Select>
                </Form.Item>
            </Col>

            <Col span={colSpan}>
                <Form.Item
                name="category"
                label="Product type"
                rules={[{required: true, message: 'Please select product type!'}]}
                >
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Product type"
                    options={categories && Array.isArray(categories) ? 
                        categories.map((c : IProduct) => ({
                        ...c,
                        label: c.name,
                        value: c._id
                    })) : []}
                    // @ts-ignore
                    autoComplete="none"
                    allowClear
                    optionFilterProp="name"
                    suffixIcon={<InboxOutlined />}
                >

                </Select>
                </Form.Item>
            </Col>

            <Col span={colSpan}>
                <Form.Item
                name="calibers"
                label="Calibers"
                rules={[{required: true, message: 'Please select calibers!'}]}
                >
                <Select
                    mode="multiple"
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Calibers"
                    options={
                        calibers && Array.isArray(calibers) ? 
                        calibers.map((c : IProduct) => ({
                        ...c,
                        label: c.name,
                        value: c._id
                        })) : []
                    }
                    // @ts-ignore
                    autoComplete="none"
                    allowClear
                    optionFilterProp="name"
                    suffixIcon={<InboxOutlined />}
                >

                </Select>
                </Form.Item>
            </Col>

            <Col span={colSpan} >
                <Form.Item
                name="crop"
                label="Crop"
                rules={[{ required: true, message: 'Please input crop!' }]}
                >
                <Input
                    size="large"
                    placeholder="Crop" />
                </Form.Item>
            </Col>

            <Col span={colSpan}>
                <Form.Item
                name="packaging"
                label="Packagings"
                rules={[{required: true, message: 'Please select Packagings!'}]}
                >
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Packagings"
                    options={
                        packagings && Array.isArray(packagings) ? 
                        packagings.map((c : IPackaging) => ({
                        ...c,
                        label: c.name,
                        value: c._id
                        })) : []
                    }
                    // @ts-ignore
                    autoComplete="none"
                    allowClear
                    optionFilterProp="name"
                    suffixIcon={<InboxOutlined />}
                >

                </Select>
                </Form.Item>
            </Col>

            <Col span={colSpan} >
                <Form.Item
                name="quantity"
                label="Tons"
                rules={[{ required: true, message: 'Please input tons!' }]}
                >
                <Input
                    size="large"
                    placeholder="Number of tons" />
                </Form.Item>
            </Col>

            <Col span={colSpan} >
                <Form.Item
                name="price"
                label="Price per ton"
                >
                <Input
                    size="large"
                    placeholder="Enter the price per ton" />
                </Form.Item>
            </Col>

            <Col span={colSpan} >
                <Form.Item
                name="brokerPercent"
                label="Broker commission"
                >
                <Input
                    size="large"
                    placeholder="Broker commission" />
                </Form.Item>
            </Col>

            <Col span={colSpan} >
                <Form.Item
                name="freeQuantity"
                label="Error margin (%)"
                >
                <Input
                    size="large"
                    placeholder="Enter only the number" />
                </Form.Item>
            </Col>

            <Col span={colSpan}>
                <Form.Item
                name="broker"
                label="Brokers"
                >
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="brokers"
                    options={
                        companies && Array.isArray(companies) ? 
                        companies.filter((company: ICompany) => company.broker)
                        .map((c : ICompany) => ({
                            ...c,
                            label: c.name,
                            value: c._id
                        })) : []
                    }
                    // @ts-ignore
                    autoComplete="none"
                    allowClear
                    optionFilterProp="name"
                    suffixIcon={<InboxOutlined />}
                >
                </Select>
                </Form.Item>
            </Col>

            <Col span={colSpan} >
                <Form.Item
                name="brokerPercent"
                label="Broker's commission"
                >
                <Input
                    size="large"
                    placeholder="Broker's commission (%)" />
                </Form.Item>
            </Col>

            <Col span={colSpan}>
                <Form.Item
                name="currency"
                label="Currency"
                rules={[{required: true, message: 'Please select Currency!'}]}
                >
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Currency"
                    options={
                        currencies && Array.isArray(currencies) ? 
                        currencies.map((c : ICurrency) => ({
                            ...c,
                            label: c.name,
                            value: c._id
                        })) : []
                    }
                    // @ts-ignore
                    autoComplete="none"
                    allowClear
                    optionFilterProp="name"
                    suffixIcon={<InboxOutlined />}
                >
                </Select>
                </Form.Item>
            </Col>

            <Col span={colSpan}>
                <Form.Item
                name="paymentMethod"
                label="PaymentMethod"
                rules={[{required: true, message: 'Please select PaymentMethod!'}]}
                >
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="PaymentMethod"
                    options={
                        paymentMethods && Array.isArray(paymentMethods) ? 
                        paymentMethods.map((c : IPaymentMethod) => ({
                            ...c,
                            label: c.name,
                            value: c._id
                        })) : []
                    }
                    // @ts-ignore
                    autoComplete="none"
                    allowClear
                    optionFilterProp="name"
                    suffixIcon={<InboxOutlined />}
                >
                </Select>
                </Form.Item>
            </Col>

            <Col span={colSpan}>
                <Form.Item
                name="surveyor"
                label="Surveyor"
                rules={[{required: true, message: 'Please select Surveyor!'}]}
                >
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Surveyor"
                    options={
                        surveyors && Array.isArray(surveyors) ? 
                        surveyors.map((c : ISurveyor) => ({
                            ...c,
                            label: c.name,
                            value: c._id
                        })) : []
                    }
                    // @ts-ignore
                    autoComplete="none"
                    allowClear
                    optionFilterProp="name"
                    suffixIcon={<InboxOutlined />}
                >
                </Select>
                </Form.Item>
            </Col>

            <Col span={colSpan} >
                <Form.Item
                name="insurance"
                label="Insurance"
                >
                <Input
                    size="large"
                    placeholder="Insurance" />
                </Form.Item>
            </Col>

            <Col span={colSpan} >
                <Form.Item
                name="shippingDate"
                label="Shipping Date"
                rules={[{required: true, message: 'Please select shippingDate!'}]}
                >
                <DatePicker size="large"  format={monthFormat} picker="month" />
                </Form.Item>
            </Col>

            <Col span={colSpan} >
                <Form.Item
                name="destination"
                label="Add Destination"
                rules={[{required: true, message: 'Please input destination!'}]}
                >
                <Input
                    size="large"
                    placeholder="Ej: Livorno - Italy" />
                </Form.Item>
            </Col>

            <Col span={colSpan} >
                <Form.Item
                name="salesConditions"
                label="Sales Conditions"
                >
                <Input
                    size="large"
                    placeholder="Ej: FCA - General Deheza" />
                </Form.Item>
            </Col>

            <Col span={colSpan} >
                <Form.Item
                name="specifications"
                label="Specifications"
                rules={[{required: true, message: 'Please input destination!'}]}
                >
                <TextArea
                    size="large"
                    placeholder="Enter specifications" />
                </Form.Item>
            </Col>
        </Row>

        <Row gutter={10} >
            <Form.Item
                name="documents"
                label="Contract documents"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{required: true, message: 'Please select document!'}]}
                >
                <Upload
                    beforeUpload={() => false}
                    listType="picture"
                    defaultFileList={[]}
                    >
                    <Button icon={<UploadOutlined />}>Select document</Button>
                </Upload>
            </Form.Item>
        </Row>

        <Row gutter={10} justify="end">
          <Col className="mt-2" span={8}>
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
    </div>
  )
}