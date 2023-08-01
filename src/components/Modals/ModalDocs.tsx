import React, { useEffect, useRef, useState } from "react";
import "./_modal-docs.scss";
import { Contract } from "src/types/contract.type";
import { Button } from "../package/Button";
import baseApiUrl from "@services/BaseApiUrl";
import $http from "@services/AxiosInstance";
import { toast } from "react-toastify";
import { File } from "../package/File";
import { Form } from "../package/Form";

interface ModalDocsProps {
  open: boolean;
  onClose: () => void;
  data: Contract;
}

const ModalDocs: React.FC<ModalDocsProps> = ({ open, onClose, data }) => {
  const bucketUrl = import.meta.env.VITE_BUCKET_URL;
  const [contract, setContract] = useState<Contract>(data || {});
  const [formData, setFormData] = useState<any>([
    {
      key: "documents",
      placeholder: "Agregar documentos",
      name: "documents",
      value: "",
      type: "file",
      validations: {
        rules: {
          required: true,
        },
      },
      cols: "c-col-span-6",
    },
  ]);

  const deleteDoc = async (idContract: string | undefined, idDoc: string) => {
    try {
      const response: { data: any; status: number } = await $http.delete(
        `${baseApiUrl}/api/v1/contracts/remove-document/${idDoc}/${idContract}`
      );
      if (response.status === 200) {
        setContract((prevData) => ({
          ...prevData,
          documents: prevData?.documents?.filter(
            (doc: any) => doc.uuid !== idDoc
          ),
        }));
        toast.success("Documento eliminado exitosamente.", {
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.success("Hubo un error al eliminar el documento.", {
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [loadingDocument, setLoadingDocument] = useState(false);
  const addDoc = async (idContract: string | undefined, files: any) => {
    if(loadingDocument) return
    try {
      if (files.isFormValid === false) {
        toast.error("El formulario no es válido.", {
          autoClose: 3000,
          theme: "dark",
        });
        return;
      }
      const formData = new FormData();

      Array.from(files.items.documents).forEach((file: any, index) => {
        if (file.type.includes("image") || file.type === "application/pdf") {
          formData.append(`documents[${index}]`, file);
        }
      });
      setLoadingDocument(true);
      const response = await $http.post(
        `${baseApiUrl}/api/v1/contracts/add-documents/${idContract}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoadingDocument(false);

      if (response.status === 200) {
        setContract((prevData: any) => ({
          ...prevData,
          documents: response.data.contract.documents,
        }));
        toast.success("Documentos agregados exitosamente.", {
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error("Hubo un error al agregar los documentos.", {
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error: any) {
      setLoadingDocument(false);
      throw new Error(error);
    }
  };

  useEffect(() => {
    setContract(data);
  }, [data]);

  return (
    <div className={`modal-docs ${open ? "modal-docs--open" : ""}`}>
      <div className="modal-docs--container">
        <button className="modal-close" type="button" onClick={onClose}>
          <img src="/icons/close.svg" alt="Cerrar" />
        </button>

        <div className="modal-docs--title">
          <h2>Documents</h2>
        </div>
        <div className="modal-docs--content">
          <div className="modal-docs--content__item">
            <h3 className="modal-contract--name">
              Contract: <span>{contract?.name}</span>
            </h3>
            <ul className="modal-docs--content__item__doc">
              {contract?.documents?.map((doc: any, i: number) => (
                <li key={i}>
                  <span>
                    {doc.path?.substring(doc.path.lastIndexOf("/") + 1)}
                  </span>
                  <div>
                    <Button
                      type="button"
                      customClass="c-bg-red c-text-white c-mx-2"
                      onClick={() => deleteDoc(contract.id, doc.uuid)}
                    >
                      Eliminar
                    </Button>
                    <a
                      href={`${bucketUrl}/${doc.path}`}
                      className="btn-primary"
                    >
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Form
            inputs={formData}
            onSubmit={(data: any) => {
              addDoc(contract.id, data);
            }}
          >
            <Button disabled={loadingDocument} type="submit" customClass="btn-primary">
              {loadingDocument ? 'Cargando' : 'Agregar'}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ModalDocs;
