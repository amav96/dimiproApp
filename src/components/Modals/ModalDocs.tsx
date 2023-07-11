import React, { useEffect } from "react";
import "./_modal-docs.scss";
import { Contract } from "src/types/contract.type";

interface ModalDocsProps {
  open: boolean;
  onClose: () => void;
  data: Contract;
}

const ModalDocs: React.FC<ModalDocsProps> = ({ open, onClose, data }) => {
  const bucketUrl = import.meta.env.VITE_BUCKET_URL;

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
              Contract: <span>{data?.name}</span>
            </h3>
            <ul className="modal-docs--content__item__doc">
              {data?.documents?.map((doc: any, i: number) => (
                <li key={i}>
                  <span>{doc.path?.substring(doc.path.lastIndexOf("/") + 1)}</span>
                  <a href={`${bucketUrl}/${doc.path}`} className="btn-primary">Download</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDocs;
