import { Button, Modal, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { IDocument, IContract } from '@localTypes/contract.type';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { AWS, uploadFileToS3 } from '@utils/AWS';
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
        const response = await contractController.generateUrlBucket(file.name, file.uid, file.type);
        if(response && response.url){
            const { url, path } = response;
            const uploadToS3 = await uploadFileToS3(url, file)
            console.log(uploadToS3)
            try {
                const response = await contractController.addDocument({
                    uuid: file.uid,
                    path
                }, contract._id);
                onStore(response.contract)
                onSuccess();

            } catch (error) {
                onError('Upload failed');
            }
            
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
