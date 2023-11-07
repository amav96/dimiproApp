import { ICompany } from "./company.type"
import { ICurrency } from "./currency.type"
import { IPackaging } from "./packaging.type"
import { IProduct } from "./product.type"
import { ISurveyor } from "./surveyor.type"
import { IUser } from "./user.type"
import { ICaliber } from './caliber.type';
import { ICategory } from './category.type';
import { IPaymentMethod } from './paymentMethod.type';

export interface IDocument {
    path: string,
    uuid: string
}

export interface IContract  {
    _id:string,
    id:string,
    name: string,
    exporter: ICompany,
    importer: ICompany,
    operator: IUser,
    product: IProduct,
    category: ICategory,
    calibers: ICaliber[],
    crop: Date,
    packaging: IPackaging,
    quantity: number,
    freeQuantity?: number,
    weight: string,
    broker: ICompany,
    brokerPercent?: string,
    price: string,
    documents?: IDocument[],
    currency: ICurrency,
    paymentMethod: IPaymentMethod,
    specifications: string,
    salesConditions?: string,
    surveyor: ISurveyor,
    insurance?: string,
    shippingDate?: string,
    destination?: string,
    created_at: Date,
    updated_at: Date
}

export interface IContractSave {
    name: string,
    exporter: string,
    importer: string,
    operator: string,
    product: string,
    category: string,
    calibers: string[],
    crop: Date,
    packaging: string,
    quantity: number,
    freeQuantity?: number,
    weight: string,
    broker: string,
    brokerPercent?: string,
    price: string,
    documents: any[] | null,
    currency: string,
    paymentMethod: string,
    specifications: string,
    salesConditions?: string,
    surveyor: string,
    insurance?: string,
    shippingDate?: string,
    destination?: string,
}