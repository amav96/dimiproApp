import { Button, Modal, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { IDocument, IContract } from '../../../types/contract.type';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { AWS } from '../../../services/utils/AWS';
import ContractRepository from '@repositories/contract.repository';

interface IDocumentsModalProps {
    documents : IDocument[]
    contract: IContract
    open: boolean
    onClose: Function
    onUpdate: Function
    onStore: Function
}

const contractController = new ContractRepository();


export function DocumentsModal(props: IDocumentsModalProps) {

    const {
        contract,
        documents,
        open,
        onClose,
        onUpdate,
        onStore,
    } = props

    useEffect(() => {
        let buildFileList : UploadFile[] = documents.map((document: IDocument) => {
            return {
                uid: document.uuid,
                name: document.path.split('/')[1],
                status: 'done',
                url: `${AWS.S3BUCKET}/${document.path}`
            }
        })
        setFileList(buildFileList)
    }, [])

    const [ fileList, setFileList] = useState<UploadFile[]>([])

    const [loadingDocument, setLoadingDocument] = useState(false);

    const addDocument = async (data: any ) => {
        const { file, onSuccess, onError } = data;
        const form = new FormData();
        form.append('documents[0]', file);

        try {
            const response = await contractController.addDocument(form, contract._id);
            onStore(response.contract)
            onSuccess();

        } catch (error) {
            onError('Upload failed');
        }
    }

    const deleteDoc = async (idContract: string , idDoc: string) => {

        if(loadingDocument) return
        try {
          const response = await contractController.removeDoc(idContract, idDoc)
          onUpdate(response.contract)
        } catch (error) {
          console.error(error);
        } finally {
            setLoadingDocument(false);
        }
      };

  return (
    <Modal
        title={`Contract : ${contract.name ?? ''}`}
        centered
        open={open}
        onCancel={() => onClose()}
        footer={null}
      >
        {
            fileList.length > 0 || documents.length === 0
            ? (<Upload
                customRequest={(value: any) => addDocument(value)}
                onRemove={(value: any) => deleteDoc(contract.id, value.uid)}
                listType="picture"
                defaultFileList={[...fileList]}
                >
                <Button icon={<UploadOutlined />}>Select document</Button>
            </Upload>) : (<></>) 
        }
    </Modal>
  )
}
