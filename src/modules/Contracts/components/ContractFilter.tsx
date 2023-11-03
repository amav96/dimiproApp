import React from 'react'
import { useAppSelector } from '@hooks/hooks';
import { RootState } from '@store/store';
import { Button,  Col, Form, Input, Row, Select, Grid } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ICompany } from '@localTypes/company.type';

interface IContractFilter {
    onFilter: Function
}

export function ContractFilter(props: IContractFilter) {

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

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const colspan = screens.md ? 5 : 24;
  return (
    <Form
      onFinish={(values: any) => handleFilter(values)}
    >
        <Row gutter={4} >
          <Col span={colspan} >
            <Form.Item name="name">
              <Input id="name-filter" autoComplete="none" size="large" placeholder="name" />
            </Form.Item>
          </Col>
          <Col span={colspan} >
            <Form.Item
            name="exporter"
            >
            <Select
                showSearch
                size="large"
                mode="multiple"
                placeholder="Exporters"
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
            >
            </Select>
            </Form.Item>
        </Col>
        <Col span={colspan} >
            <Form.Item
            name="importer"
            >
            <Select
                showSearch
                size="large"
                mode="multiple"
                placeholder="Importers"
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
            >
            </Select>
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
