import React, { useEffect, useRef, useState } from 'react'
import { Button, Checkbox, Col, Form, FormInstance, Input, Modal, Row, Select, Breakpoint, Grid } from 'antd';
import CompanyRepository from '@repositories/company.repository';
import { IPropsCompany, ISaveCompany } from 'src/types/company.type';
import { toast } from 'react-toastify';
import { useAppSelector } from '@hooks/hooks';
import { RootState } from '@store/store';
import PlaceRepository from '@repositories/places.repository'
import { IState, ICountry, ICity } from '../../../types/places.type';

const companyController = new CompanyRepository();
const placeController = new PlaceRepository()

export function CompanySave(props: IPropsCompany) {
  const {
      company = null,
      open,
      onCancel,
      onStore,
      onUpdate
  } = props

  const countries = useAppSelector((state: RootState) => state.dataProviders.countries);
  const prefixs = useAppSelector((state: RootState) => state.dataProviders.prefixs);

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (values: ISaveCompany) => {
    let formValues = {...values};
    if(countrySelected.current){
      formValues.country = countrySelected.current
    }
    if(stateSelected.current){
      formValues.state = stateSelected.current
    }
    formValues.city = citySelected.current
    formValues.importer = Number(values.importer ?? false);
    formValues.exporter = Number(values.exporter ?? false);
    formValues.broker = Number(values.broker ?? false);

    setLoading(true);
    try {
      let data = null;
      if(company){
        const response = await companyController.update(formValues, company._id);
        data = response.data
      } else {
        const response = await companyController.store(formValues);
        data = response.data
      }

      if(company){
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

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const colSpan = screens.xs ? 24 : 12
  const formRef = React.useRef<FormInstance>(null);
  const onReset = () => {
    formRef.current?.resetFields();
  };

  useEffect(() => {
    completeForm()
  }, [company])

  const completeForm = () => {
    if(company && formRef.current){
      formRef.current.setFieldsValue({
        ...company,
        ...(company.country ? { country: company.country.iso2 } : {}),
        ...(company.state ? { state: company.state.iso2 } : {}),
        ...(company.city ? { city: company.city.id } : {}),
      })
      if(company.country){
        onCountry(company.country)
      }
      if(company.state){
        onState(company.state)
      }
      if(company.city){
        citySelected.current = company.city
      }
    }
  }


  const countrySelected = useRef<ICountry | null>(null);
  const onCountry = async (data: any) => {
    try {
      setStateLoading(true)
      countrySelected.current = data
      let result = await placeController.getStatesByCountry(data.id)
      if(result.states){
        setStates(result.states);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setStateLoading(false)
    }
  }

  const [stateLoading, setStateLoading] = useState<boolean>(false);
  const [states, setStates] = useState<any>([]);
  const stateSelected = useRef<IState | null>(null);
  const onState = async (data: any) => {
    try {
      if(countrySelected.current?.id){
        stateSelected.current = data
        setCityLoading(true)
        let result = await placeController.getCitiesByCountryAndState(countrySelected.current.id, data.iso2)
        if(result.cities){
          setCities(result.cities)
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setCityLoading(false)
    }
  }

  const [cities, setCities] = useState<any>([]);
  const [cityLoading, setCityLoading] = useState<boolean>(false);
  const citySelected = useRef<ICity | null>(null);

  return (
    <Modal
        title={`${company ? `Edit ${company.name}` : 'Save company'}`}
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
        <Row gutter={14} >
          <Col span={colSpan} >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input Name!' }]}
            >
              <Input
                size="large"
                placeholder="Name" />
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
              name="website"
              label="Website"
            >
              <Input
                size="large"
                placeholder="Website" />
            </Form.Item>
          </Col>

          <Col span={colSpan}>
            <Form.Item
            name="country"
            label="Country"
            rules={[{required: true, message: 'Please select country!'}]}
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                size="large"
                placeholder="Country"
                onSelect={(_, option: any) => onCountry(option.data)}
                // @ts-ignore
                autoComplete="none"
                allowClear
                optionFilterProp="name"
              >
                {countries &&
                Array.isArray(countries) &&
                countries.map((c: ICountry) => (
                  <Select.Option key={c.id} value={c.iso2} data={c} name={c.name}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={colSpan}>
            <Form.Item
                name="state"
                label="State"
                rules={[(states && states.length > 0 ? {required: true, message: 'Please select state!'} : {})]}
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                size="large"
                placeholder="State"
                onSelect={(_, option: any) => onState(option.data)}
                // @ts-ignore
                autoComplete="none"
                allowClear
                optionFilterProp="name"
                loading={stateLoading}
              >
                {states &&
                Array.isArray(states) &&
                states.map((c: IState) => (
                  <Select.Option key={c.id} value={c.iso2} data={c} name={c.name}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={colSpan}>
            <Form.Item
                name="city"
                label="City"
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                size="large"
                placeholder="City"
                onSelect={(_, option: any) => citySelected.current = option.data}
                // @ts-ignore
                autoComplete="none"
                allowClear
                optionFilterProp="name"
                loading={cityLoading}
              >
                {cities &&
                Array.isArray(cities) &&
                cities.map((c: ICity) => (
                  <Select.Option key={c.id} value={c.id} data={c} name={c.name}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={colSpan}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please input address!' }]}
            >
              <Input
                size="large"
                placeholder="Address" />
            </Form.Item>
          </Col>

          <Col span={colSpan}>
            <Form.Item
            name="postalCode"
            label="Postal code"
            >
              <Input
                size="large"
                placeholder="Postal code"
              />
            </Form.Item>
          </Col>

          <Col span={colSpan}>
            <Form.Item
              name="prefixCode"
              label="Prefix +58"
              // rules={[{ required: true, message: 'Please select prefixCode!' }]}
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
              // rules={[{ required: true, message: 'Please input phoneNumber!' }]}
            >
              <Input
                size="large"
                type="number"
                placeholder="PhoneNumber" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="vat"
              label="vat"
            >
              <Input
                size="large"
                placeholder="Vat"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Row>
              <Form.Item
                name="exporter"
                valuePropName="checked"
              >
                <Checkbox>
                  Exporter
                </Checkbox>
              </Form.Item>

              <Form.Item
              name="importer"
              valuePropName="checked"
              >
                <Checkbox>
                  Importer
                </Checkbox>
              </Form.Item>

              <Form.Item
              name="broker"
              valuePropName="checked"
              >
                <Checkbox>
                  Broker
                </Checkbox>
              </Form.Item>
            </Row>
          </Col>

          <Col className="mt-4" span={colSpan}>
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

          <Col className="mt-4" span={colSpan}>
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
