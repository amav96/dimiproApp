import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@package";
import { formatDateTime } from "@services/utils/Formatters";
import { setCompanies } from "@store/dataProviders/dataProvidersSlice";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { useAfterUpdate } from "@hooks/useAfterUpdate";
import { useAfterStore } from "@hooks/useAfterStore";
import { useAfterDelete } from "@hooks/useAfterDelete";

import { Button, Col, Form, Input, Row, Skeleton, Space, Table, Modal, Tooltip, Select, Tag } from 'antd';
import CompanyRepository from "@repositories/company.repository";
import { ICompany } from "src/types/company.type";
import Column from "antd/es/table/Column";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { CompanySave } from "./CompanySave";
import useDataProvider from '@hooks/useDataProvider';
import { CompanyFilter } from "./CompanyFilter";
import { IFilterCompany } from '../../../types/company.type';
import { ICity, ICountry, IState } from '../../../types/places.type';

const companyController = new CompanyRepository();

export function CompanyList() {

  const{ getDataProviders } = useDataProvider()

  useEffect(() => {
    getDataProviders(['countries', 'prefixs'])
  }, [])

  useEffect(() => {
    getItems()
  }, [])

  const [items, setItems] = useState<ICompany[]>([]);
  const itemsMemory = useRef<ICompany[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const getItems = async (params: IFilterCompany = {}) => {
    try {
      setLoading(true)
      const response = await companyController.getAll(params);
      itemsMemory.current = response
      setItems(response);
      // Procesa la respuesta exitosa aquí
    } catch (error) {
      // Maneja el error aquí, por ejemplo, muestra un mensaje al usuario
      console.error('Error al obtener items:', error);
    } finally{
      setLoading(false)
    }
  }

  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ICompany | null>(null);
  const openUpdate = (value: ICompany) => {
    setCurrentItem(value)
    setOpen((prev) => !prev)
  }

  const openStore = () => {
    setOpen((prev) => !prev)
  }

  const addItem = (data: ICompany) => {
    setItems((prev) => [...prev, ...[data]])
    afterStore(data)
  }

  const updateItems = ( data: ICompany) => {
    setItems((prev) => (
      prev.map((val) => {
        if(val._id === data._id){
          return {...prev, ...data}
        } else {
          return val
        }
      })
    ))
    afterUpdate(data)
  }

  const cancel = (val : boolean) => {
    if(currentItem !== null){
      setCurrentItem(null)
    }
    setOpen(val)
  }

  const { confirm } = Modal;
  const openDelete = (data: ICompany) => {
    confirm({
      title: 'Confirm delete',
      content: '¿Are you sure to delete?',
      okText: 'yes',
      cancelText: 'no',
      onOk() {
        deleteItem(data)
      },
    });
  }

  const deleteItem = async (data: ICompany) => {
    try {
      const response = await companyController.delete(data._id)

      setItems((prev) => (
        prev.filter((item) => item._id !== response.data._id)
      ))

      afterDelete(response.data)

    } catch (error) {

    } finally {

    }

  }

  const dispatch = useAppDispatch();

  const companies = useAppSelector(
    (state: RootState) => state.dataProviders.companies
  );

  const afterUpdate = useAfterUpdate(dispatch, setCompanies, companies);

  const afterStore = useAfterStore(dispatch, setCompanies, companies)

  const afterDelete = useAfterDelete(dispatch, setCompanies, companies)

  const tagByType = (values: any) => {
    return Object.keys(values).map((key: any, i: number) => {
      if(values[key] && values[key] !== 0) {
        if(key === 'exporter'){
          return <Tag key={i} bordered={false} color="purple">Exporter</Tag>
        } else if(key === 'importer'){
          return <Tag key={i} bordered={false} color="geekblue">Importer</Tag>
        } else if(key === 'broker'){
          return <Tag key={i} bordered={false} color="processing">Broker</Tag>
        }
      }
    })
  }

  return (
    <Layout title={"Companies"}>
      { <CompanySave
        open={open}
        onCancel={(val : boolean) => cancel(val)}
        onUpdate={(val: ICompany) => updateItems(val)}
        onStore={(val: ICompany) => addItem(val)}
        company={currentItem}
      /> }

        <CompanyFilter
        onFilter={getItems}
        />

      <Space wrap style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          loading={false}
          onClick={() => openStore()}
        >
          Store
        </Button>
      </Space>

      { <Table
          dataSource={items}
          rowKey="id"
          locale={{
            emptyText: loading ? <Skeleton active={true} /> : (<></>)
          }}
          scroll={{ x: 400 }}
        >
          <Column title="Name" dataIndex="name" key="name"  />
          <Column title="Email" dataIndex="email" key="email" />
          <Column
            title="Type"
            dataIndex="types"
            key="types"
            render={(value: any) => (<>{tagByType(value)}</>)}
          />
          <Column
            title="Country"
            dataIndex="country"
            key="country"
            render={(country: ICountry) => (<>{country? country.name : ''}</>)}
          />
          <Column
            title="State"
            dataIndex="state"
            key="state"
            render={(state: IState) => (<>{state ? state.name : ''}</>)}
          />
          <Column
            title="City"
            dataIndex="city"
            key="city"
            render={(city: ICity) => (<>{city ? city.name : ''}</>)}
          />
          <Column title="CP" dataIndex="postalCode" key="postalCode" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column title="Vat" dataIndex="vat" key="vat" />
          <Column
            title="Created at"
            dataIndex="createdAt"
            key="createdAt"
            render={(createdAt: string) => (<>{createdAt ? formatDateTime(createdAt) : ''}</>)}
          />
          <Column
          title="Action"
          key="action"
          render={(_: any, record: ICompany) => (
            <Space size="middle">
              <Tooltip title="Edit">
                <Button  onClick={() => openUpdate(record)} type="dashed" shape="circle" icon={<EditOutlined />} />
              </Tooltip>
              <Tooltip title="Delete">
                <Button  onClick={() => openDelete(record)} type="dashed" shape="circle" icon={<DeleteOutlined />} />
              </Tooltip>
            </Space>
          )}
          />
      </Table> }
    </Layout>
  );
}
