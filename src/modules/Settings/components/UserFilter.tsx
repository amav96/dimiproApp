import React from 'react'
import { useAppSelector } from '@hooks/hooks';
import { RootState } from '../../../store/store';
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ICompany } from '../../../types/company.type';

interface UserFilter {
    onFilter: Function
}

export function UserFilter(props: UserFilter) {

    const {
        onFilter
    } = props

    const companies = useAppSelector((state: RootState) => state.dataProviders.companies);

    const handleFilter = (values: any) => {
        let filters = {...values};
        for(let filter in filters){
          if(filters[filter] === '' || filters[filter] === null || filters[filter] === undefined){
            delete filters[filter]
          }
        }
        onFilter(filters)
    }

  return (
    <Form
          onFinish={(values: any) => handleFilter(values)}
        >
           <Row gutter={4} >
              <Col >
                <Form.Item name="firstName">
                  <Input id="firstName-filter" autoComplete="none" size="large" placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col >
                <Form.Item name="lastName">
                  <Input id="lastName-filter" autoComplete="none" size="large" placeholder="Last Name" />
                </Form.Item>
              </Col>
              <Col >
                <Form.Item name="email">
                  <Input id="email-filter" autoComplete="none" size="large" placeholder="Email" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                name="company"
                >
                <Select
                    showSearch
                    mode="multiple"
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="Company"
                    options={companies && Array.isArray(companies) ? companies.map((c : ICompany) => ({
                    ...c,
                    label: c.name,
                    value: c._id
                    })) : []}
                    id="company-filter"
                    // @ts-ignore
                    autoComplete="none"
                    allowClear
                    optionFilterProp="name"
                />
                </Form.Item>
              </Col>

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
