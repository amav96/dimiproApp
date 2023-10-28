import React from 'react'
import { useAppSelector } from '@hooks/hooks';
import { RootState } from '@store/store';
import { Button, Checkbox, Col, Form, Grid, Input, Row, Select } from 'antd';
import { ICountry } from '@localTypes/places.type';
import { SearchOutlined } from '@ant-design/icons';

interface ICompanyFilter {
    onFilter: Function
}

export function CompanyFilter(props: ICompanyFilter) {

    const {
        onFilter
    } = props

    const countries = useAppSelector((state: RootState) => state.dataProviders.countries);

    const handleFilter = (values: any) => {
        let filters = {...values};

        for(let filter in filters){
          if(filters[filter] === '' || filters[filter] === null || filters[filter] === undefined){
            delete filters[filter]
          }
        }

        if(filters.exporter !== undefined) {
            filters.exporter = Number(filters.exporter);
        }
        if(filters.importer !== undefined){
            filters.importer = Number(filters.importer);
        }
        if(filters.broker !== undefined){
            filters.broker = Number(filters.broker);
        }
        
        onFilter(filters)

    }

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const colspan = screens.md ? 6 : 24;

  return (
    <Form
          onFinish={(values: any) => handleFilter(values)}
        >
           <Row gutter={4} >

              <Col span={colspan} >
                <Form.Item name="name">
                  <Input autoComplete="none" size="large" placeholder="Name" />
                </Form.Item>
              </Col>
              <Col span={colspan} >
                <Form.Item name="email">
                  <Input autoComplete="none" size="large" placeholder="email" />
                </Form.Item>
              </Col>

              <Col span={colspan} >
                <Form.Item
                  name="country"
                >
                  <Select
                    showSearch
                    mode="multiple"
                    size="large"
                    placeholder="Country"
                    // @ts-ignore
                    autoComplete="none"
                    options={countries?.map((c : ICountry) => ({
                      ...c,
                      label: c.name,
                      value: c.id
                    })) || []}

                    allowClear
                    optionFilterProp="name"
                  />
                </Form.Item>
              </Col>

               <Row className="ml-2">
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

              <Form.Item>
                <Button
                  size="large"
                  icon={<SearchOutlined />}
                  htmlType="submit">
                </Button>
              </Form.Item>
          </Row>
        </Form>
  )
}
