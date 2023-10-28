import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout } from "@components/Layout";
import { formatDateTime } from "@utils/Formatters";
import { Button, Skeleton, Space, Table, Modal, Tooltip, PaginationProps, Pagination, } from 'antd';
import ContractRepository from "@repositories/contract.repository";
import { IContract } from "@localTypes/contract.type";
import Column from "antd/es/table/Column";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import useDataProvider from '@hooks/useDataProvider';
import { ContractFilter } from "./ContractFilter";
import { IFilterUser } from '@localTypes/user.type';
import { ICompany } from '@localTypes/company.type';
import { IProduct } from '@localTypes/product.type';
import { ICategory } from '@localTypes/category.type';
import { ICaliber } from '@localTypes/caliber.type';
import { IPackaging } from '@localTypes/packaging.type';
import { ICurrency } from '@localTypes/currency.type';
import { IPaymentMethod } from '@localTypes/paymentMethod.type';
import { ISurveyor } from '@localTypes/surveyor.type';
import { DocumentsModal } from "./DocumentsModal";
import { useNavigate } from "react-router-dom";
import { ContractSave } from './ContractSave';

const contractController = new ContractRepository();

export function ContractList() {

  const navigate = useNavigate()

  const{ getDataProviders } = useDataProvider()

  useEffect(() => {
    getDataProviders(['countries','roles','companies'])
  }, [])

  useEffect(() => {
    getItems()
  }, [])

  const [items, setItems] = useState<IContract[]>([]);
  const itemsMemory = useRef<IContract[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<any>({
    currentPage: 1,
    total: 0,
    pageSize: 0
  });

  const onChange: PaginationProps['onChange'] = (page) => {
    setPagination((prev : any) => ({
      ...prev,
      currentPage: page,
     }));
     filterParams.current.page = page;
     getItems(filterParams.current)
  };
  const filterParams = useRef<any>({});

  const getItems = async (params: IFilterUser = {}) => {
    try {
      setLoading(true)
      filterParams.current = params
      const response = await contractController.getAll(filterParams.current);
      itemsMemory.current = response
      setItems(response.docs);
      setPagination((prev : any) => ({
        ...prev,
        total: response.totalDocs,
        pageSize: response.limit
       }));
      // Procesa la respuesta exitosa aquí
    } catch (error) {
      // Maneja el error aquí, por ejemplo, muestra un mensaje al usuario
      console.error('Error al obtener items:', error);
    } finally{
      setLoading(false)
    }
  }

  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<IContract | null>(null);
  const openUpdate = (value: IContract) => {
    setCurrentItem(value)
    setOpen((prev) => !prev)
  }

  const updateItems = ( data: IContract) => {
    setItems((prev) => (
      prev.map((val) => {
        if(val._id === data._id){
          return {...val, ...data}
        } else {
          return val
        }
      })
    ))
  }

  const handleClose = () => {
    if(currentItem !== null){
      setCurrentItem(null)
    }
    setOpen(false)
  }

  const { confirm } = Modal;
  const openDelete = (data: IContract) => {
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

  const deleteItem = async (data: IContract) => {
    try {
      const response = await contractController.delete(data._id)

      setItems((prev) => (
        prev.filter((item) => item._id !== response.data._id)
      ))

    } catch (error) {

    } finally {

    }

  }

  const [openDocumentsModal, setOpenDocumentsModal] = useState<boolean>(false)
  const [documents, setDocuments] = useState<any>([]);
  const handleOpenDocumentsModal = (data: any, contract: IContract) => {
    setCurrentItem(contract)
    setDocuments(data)
    setOpenDocumentsModal(true)
  }
  const handleCloseDocumentsModal = () => {
    setOpenDocumentsModal(false)
    setCurrentItem(null)
    setDocuments([])
  }

  const updateContractDocuments = (contract: IContract) => {
    setItems((prev) => (
      prev.map((val) => {
        if(val._id === contract._id){
          return {
            ...val,
            documents: contract.documents,
          }
        } else {
          return val
        }
      })
    ))
  }

  const onOpenPdf = (contractId: string) => {
    window.open(`/pdf/${contractId}`);
  };


  return (
    <Layout title={"Contracts"}>
        <ContractFilter
        onFilter={getItems}
        />

      <Space wrap style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          loading={false}
          onClick={() => navigate('/add-contract')}
        >
          Store
        </Button>
      </Space>

      {
        <>
        <Table
            dataSource={items}
            rowKey="_id"
            locale={{
              emptyText: loading ? <Skeleton active={true} /> : (<></>)
            }}
            scroll={{ x: 400 }}
            pagination={false}
          >
            <Column title="Name" dataIndex="name" key="name"  />
            <Column
              title="Product"
              dataIndex="product"
              key="product"
              render={(product: IProduct) => (<>{product? product.name : ''}</>)}
            />
            <Column
            title="Exporter"
            dataIndex="exporter"
            key="exporter"
            render={(exporter: ICompany) => (<>{exporter? exporter.name : ''}</>)}
            />
            <Column
            title="Importer"
            dataIndex="importer"
            key="importer"
            render={(importer: ICompany) => (<>{importer? importer.name : ''}</>)}
            />
            <Column
            title="Broker"
            dataIndex="broker"
            key="broker"
            render={(broker: ICompany) => (<>{broker? broker.name : ''}</>)}
            />
            <Column title="Broker (%)" dataIndex="brokerPercent" key="brokerPercent"  />
            <Column
              title="Type Product"
              dataIndex="category"
              key="category"
              render={(category: ICategory) => (<>{category ? category.name : ''}</>)}
            />
            <Column
              title="Calibers"
              dataIndex="calibers"
              key="calibers"
              render={(calibers: ICaliber[]) => {
                if(calibers && calibers.length > 0) {
                  return (calibers.map((caliber: ICaliber, index : number) => <div key={index} className="mr-1"> { caliber.name}</div>))
                } else {
                  return (<div></div>)
                }
              }}
            />
            <Column title="Crop" dataIndex="crop" key="crop"  />
            <Column title="Quantity (TN)" dataIndex="quantity" key="quantity"  />
            <Column
              title="Packaging"
              dataIndex="packaging"
              key="packaging"
              render={(packaging: IPackaging) => (<>{packaging ? packaging.name : ''}</>)}
            />
            <Column
              title="Currency"
              dataIndex="currency"
              key="currency"
              render={(currency: ICurrency) => (<>{currency ? currency.name : ''}</>)}
            />
            <Column
              title="Payment method"
              dataIndex="paymentMethod"
              key="paymentMethod"
              render={(paymentMethod: IPaymentMethod) => (<>{paymentMethod ? paymentMethod.name : ''}</>)}
            />
            <Column title="price" dataIndex="price" key="price"  />
            <Column
              title="Surveyor"
              dataIndex="surveyor"
              key="surveyor"
              render={(surveyor: ISurveyor) => (<>{surveyor ? surveyor.name : ''}</>)}
            />
            <Column
              title="Specifications"
              dataIndex="specifications"
              key="specifications"
              render={(specifications: string) => (<>{specifications.length > 50 ? specifications.substr(0, 35) + "..." : specifications}</>)}
            />

            <Column
              title="Created at"
              dataIndex="createdAt"
              key="createdAt"
              render={(createdAt: string) => (<>{createdAt ? formatDateTime(createdAt) : ''}</>)}
            />
            <Column
              title="Documents"
              dataIndex="documents"
              key="documents"
              render={(documents: any, data: any) =>
                (<>
                <Button
                  block
                  type="default"
                  onClick={() => handleOpenDocumentsModal(documents, data)}
                  >
                  Open
                </Button>
                </>)}
            />
            <Column
              title="Pdf"
              dataIndex="id"
              key="id"
              render={(id: string) =>
                (<>
                <Button
                  block
                  type="default"
                  onClick={() => onOpenPdf(id)}
                  >
                  Download
                </Button>
                </>)
              }
            />
            <Column
            title="Action"
            key="action"
            render={(_: any, record: IContract) => (
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
        </Table>

        <Pagination className="mt-2" current={pagination.currentPage} onChange={onChange} total={pagination.total} pageSize={pagination.pageSize} />
      </>
      }
      {
         currentItem ? (
          <DocumentsModal
            contract={currentItem}
            documents={documents}
            open={openDocumentsModal}
            onClose={handleCloseDocumentsModal}
            onUpdate={updateContractDocuments}
            onStore={updateContractDocuments}
          />
        ) : (
          <></>
        )
      }

      <Modal
        title={`Contract edit`}
        centered
        open={open}
        onCancel={() => handleClose()}
        footer={null}
        width={1000}
      >
        {
          currentItem &&
          <ContractSave
          contract={currentItem}
          onClose={() => handleClose()}
          onUpdate={(contract: IContract) => updateItems(contract)}
          />
        }

      </Modal>

    </Layout>
  );
}
