import { Caliber } from "./caliber.type"

export interface Product {
    _id?:string,
    id?:string,
    name: string
    category: Caliber[]
}
