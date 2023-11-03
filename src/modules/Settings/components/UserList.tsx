import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@components/Layout";
import { formatDateTime } from "@utils/Formatters";
import { Button, Skeleton, Space, Table, Modal, Tooltip, } from 'antd';
import UserRepository from "@repositories/user.repository";
import { IUser } from "@localTypes/user.type";
import Column from "antd/es/table/Column";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { UserSave } from "./UserSave";
import useDataProvider from '@hooks/useDataProvider';
import { UserFilter } from "./UserFilter";
import { IFilterUser } from '@localTypes/user.type';
import { IRole } from '@localTypes/role.type';
import { ICompany } from '@localTypes/company.type';

const userController = new UserRepository();

export function UserList() {

  const{ getDataProviders } = useDataProvider()

  useEffect(() => {
    getDataProviders(['countries','roles','companies'])
  }, [])

  useEffect(() => {
    getItems()
  }, [])

  const [items, setItems] = useState<IUser[]>([]);
  const itemsMemory = useRef<IUser[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const getItems = async (params: IFilterUser = {}) => {
    try {
      setLoading(true)
      const response = await userController.getAll(params);
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
  const [currentItem, setCurrentItem] = useState<IUser | null>(null);
  const openUpdate = (value: IUser) => {
    setCurrentItem(value)
    setOpen((prev) => !prev)
  }

  const openStore = () => {
    setOpen((prev) => !prev)
  }

  const addItem = (data: IUser) => {
    setItems((prev) => [...prev, ...[data]])
  }

  const updateItems = ( data: IUser) => {
    setItems((prev) => (
      prev.map((val) => {
        if(val._id === data._id){
          return {...prev, ...data}
        } else {
          return val
        }
      })
    ))
  }

  const cancel = (val : boolean) => {
    if(currentItem !== null){
      setCurrentItem(null)
    }
    setOpen(val)
  }

  const { confirm } = Modal;
  const openDelete = (data: IUser) => {
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

  const deleteItem = async (data: IUser) => {
    try {
      const response = await userController.delete(data._id)

      setItems((prev) => (
        prev.filter((item) => item._id !== response.data._id)
      ))

    } catch (error) {

    } finally {

    }

  }

  return (
    <Layout title={"Users"}>
      { <UserSave
        open={open}
        onCancel={(val : boolean) => cancel(val)}
        onUpdate={(val: IUser) => updateItems(val)}
        onStore={(val: IUser) => addItem(val)}
        user={currentItem}
      /> }

        <UserFilter
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
          rowKey="_id"
          locale={{
            emptyText: loading ? <Skeleton active={true} /> : (<></>)
          }}
          scroll={{ x: 400 }}
        >
          <Column title="FirstName" dataIndex="firstName" key="firstName"  />
          <Column title="LastName" dataIndex="lastName" key="lastName"  />
          <Column title="Email" dataIndex="email" key="email" />
          <Column
            title="Company"
            dataIndex="company"
            key="company"
            render={(company: ICompany) => (<>{company ? company.name : ''}</>)}
          />
          <Column
            title="Role"
            dataIndex="role"
            key="role"
            render={(role: IRole) => (<>{role? role.name : ''}</>)}
          />
          <Column
            title="Created at"
            dataIndex="createdAt"
            key="createdAt"
            render={(createdAt: string) => (<>{createdAt ? formatDateTime(createdAt) : ''}</>)}
          />
          <Column
          title="Action"
          key="action"
          render={(_: any, record: IUser) => (
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
