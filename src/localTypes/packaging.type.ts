export interface IPackaging {
    _id:string,
    id:string,
    name: string;
}

export type IPackagingSave = Omit<IPackaging, "_id" | "id">

export interface IPackagingProps {
    packaging : IPackaging | null
    open: boolean
    onCancel: Function
    onUpdate: Function
    onStore: Function
}