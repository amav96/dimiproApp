import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@package";
import { formatDateTime } from "@services/utils/Formatters";
import { setProducts } from "@store/dataProviders/dataProvidersSlice";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { useAfterUpdate } from "@hooks/useAfterUpdate";
import { useAfterStore } from "@hooks/useAfterStore";
import { useAfterDelete } from "@hooks/useAfterDelete";

import { Button, Col, Form, Input, Row, Skeleton, Space, Table, Modal, Tooltip } from 'antd';
import ProductRepository from "@repositories/product.repository";
import { IProduct } from "src/types/product.type";
import Column from "antd/es/table/Column";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ProductSave } from "./ProductSave";

const productController = new ProductRepository();

export function ProductList() {

  useEffect(() => {
    getItems()
  }, [])

  const [items, setItems] = useState<IProduct[]>([]);
  const itemsMemory = useRef<IProduct[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const getItems = async () => {
    try {
      setLoading(true)
      const response = await productController.getAll();
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
  const [currentItem, setCurrentItem] = useState<IProduct | null>(null);
  const openUpdate = (value: IProduct) => {
    setCurrentItem(value)
    setOpen((prev) => !prev)
  }

  const openStore = () => {
    setOpen((prev) => !prev)
  }

  const addItem = (data: IProduct) => {
    setItems((prev) => [...prev, ...[data]])
    afterStore(data)
  }

  const updateItems = ( data: IProduct) => {
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
  const openDelete = (data: IProduct) => {
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

  const deleteItem = async (data: IProduct) => {
    try {
      const response = await productController.delete(data._id)

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

  const products = useAppSelector(
    (state: RootState) => state.dataProviders.products
  );

  const afterUpdate = useAfterUpdate(dispatch, setProducts, products);

  const afterStore = useAfterStore(dispatch, setProducts, products)

  const afterDelete = useAfterDelete(dispatch, setProducts, products)

  return (
    <Layout title={"Products"}>
      <ProductSave
        open={open}
        onCancel={(val : boolean) => cancel(val)}
        onUpdate={(val: IProduct) => updateItems(val)}
        onStore={(val: IProduct) => addItem(val)}
        product={currentItem}
      />

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
          render={(_: any, record: IProduct) => (
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
