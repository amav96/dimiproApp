import { Company } from "./company.type"
import { Currency } from "./currency.type"
import { GenericModel } from "./genericModel.type"
import { Packaging } from "./packaging.type"
import { City, Country } from "./places.type"
import { Product } from "./product.type"
import { Surveyor } from "./surveyor.type"
import { User } from "./user.type"

export interface Document {
    path: string
}

export interface Contract  {
    _id?:string,
    id?:string,
    name: string,
    exporter: Company,
    importer: Company,
    operator: User,
    product: Product,
    category: GenericModel,
    calibers: GenericModel[],
    crop: Date,
    packaging: Packaging,
    quantity: number,
    freeQuantity?: number,
    weight: string,
    broker: Company,
    brokerPercent?: string,
    price: string,
    documents?: Document[],
    currency: Currency,
    paymentMethod: GenericModel,
    specifications: string,
    surveyor: Surveyor,
    insurance?: string,
    shippingDate?: Date,
    destination?: {
        country: Country,
        city: City,
    },
    created_at: Date,
    updated_at: Date
}