export interface IPaymentMethod {
    _id: string;
    id: string;
    name: string;
}
export type IPaymentMethodSave = Omit<IPaymentMethod, "_id" | "id">;
export interface IPaymentMethodProps {
    paymentMethod: IPaymentMethod | null;
    open: boolean;
    onCancel: Function;
    onUpdate: Function;
    onStore: Function;
}
