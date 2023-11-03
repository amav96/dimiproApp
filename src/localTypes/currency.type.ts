export interface ICurrency {
    _id:string,
    id:string,
    name: string;
}

export type ICurrencySave = Omit<ICurrency, "_id" | "id">

export interface ICurrencyProps {
    currency : ICurrency | null
    open: boolean
    onCancel: Function
    onUpdate: Function
    onStore: Function
}