import { IPaymentMethodSave } from "@localTypes/paymentMethod.type";
declare class PaymentMethodRepository {
    getAll(): Promise<any>;
    store(params: IPaymentMethodSave): Promise<any>;
    update(params: IPaymentMethodSave, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default PaymentMethodRepository;
