import { IDocument, IContract } from '@localTypes/contract.type';
interface IDocumentsModalProps {
    documents: IDocument[];
    contract: IContract;
    open: boolean;
    onClose: Function;
    onUpdate: Function;
    onStore: Function;
}
export declare function DocumentsModal(props: IDocumentsModalProps): import("react/jsx-runtime").JSX.Element;
export {};
