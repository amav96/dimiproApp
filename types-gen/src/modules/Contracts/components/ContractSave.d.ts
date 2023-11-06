import { IContract } from '@localTypes/contract.type';
interface IContractSaveProp {
    contract?: IContract;
    onClose?: Function;
    onUpdate?: Function;
}
export declare function ContractSave(prop: IContractSaveProp): import("react/jsx-runtime").JSX.Element;
export {};
