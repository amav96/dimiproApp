import { ICurrencySave } from "@localTypes/currency.type";
declare class CurrencyRepository {
    getAll(): Promise<any>;
    store(params: ICurrencySave): Promise<any>;
    update(params: ICurrencySave, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default CurrencyRepository;
