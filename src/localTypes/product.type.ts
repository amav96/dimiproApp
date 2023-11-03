export interface IProduct {
    _id:string,
    id:string,
    name: string
}

export type IProductSave = Omit<IProduct, "_id" | "id">

export interface IProductProps {
    product : IProduct | null
    open: boolean
    onCancel: Function
    onUpdate: Function
    onStore: Function
  }