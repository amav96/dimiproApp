import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@package";
import { formatDateTime } from "@services/utils/Formatters";
import { setCategories } from "@store/dataProviders/dataProvidersSlice";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { useAfterUpdate } from "@hooks/useAfterUpdate";
import { useAfterStore } from "@hooks/useAfterStore";
import { useAfterDelete } from "@hooks/useAfterDelete";

import { Button, Col, Form, Input, Row, Skeleton, Space, Table, Modal, Tooltip } from 'antd';
import CategoryRepository from "@repositories/category.repository";
import { ICategory } from "src/types/category.type";
import Column from "antd/es/table/Column";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { CategorySave } from "./CategorySave";

const categoryController = new CategoryRepository();

export function CategoryList() {

  useEffect(() => {
    getItems()
  }, [])

  const [items, setItems] = useState<ICategory[]>([]);
  const itemsMemory = useRef<ICategory[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const getItems = async () => {
    try {
      setLoading(true)
      const response = await categoryController.getAll();
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
  const [currentItem, setCurrentItem] = useState<ICategory | null>(null);
  const openUpdate = (value: ICategory) => {
    setCurrentItem(value)
    setOpen((prev) => !prev)
  }

  const openStore = () => {
    setOpen((prev) => !prev)
  }

  const addItem = (data: ICategory) => {
    setItems((prev) => [...prev, ...[data]])
    afterStore(data)
  }

  const updateItems = ( data: ICategory) => {
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
  const openDelete = (data: ICategory) => {
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

  const deleteItem = async (data: ICategory) => {
    try {
      const response = await categoryController.delete(data._id)

      setItems((prev) => (
        prev.filter((item) => item._id !== response.data._id)
      ))

      afterDelete(response.data)

    } catch (error) {

    } finally {

    }

  }

  const onFilter = (form: any) => {
    if(form.name){
      let filtered = itemsMemory.current.filter((val : any) => val.name.indexOf(form.name) > -1)
      setItems(filtered)
    } else {
      setItems(itemsMemory.current)
    }
  }

  const dispatch = useAppDispatch();

  const categories = useAppSelector(
    (state: RootState) => state.dataProviders.categories
  );

  const afterUpdate = useAfterUpdate(dispatch, setCategories, categories);

  const afterStore = useAfterStore(dispatch, setCategories, categories)

  const afterDelete = useAfterDelete(dispatch, setCategories, categories)

  return (
    <Layout title={"Categories"}>
      { <CategorySave
        open={open}
        onCancel={(val : boolean) => cancel(val)}
        onUpdate={(val: ICategory) => updateItems(val)}
        onStore={(val: ICategory) => addItem(val)}
        category={currentItem}
      /> }

        <Form
          onFinish={onFilter}
        >
           <Row gutter={2} >
              <Col >
                <Form.Item name="name">
                  <Input size="large" placeholder="Name" />
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
        >
          <Column title="Name" dataIndex="name" key="name" />
          <Column
          title="Action"
          key="action"
          render={(_: any, record: ICategory) => (
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
