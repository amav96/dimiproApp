import { IProductSave } from "@localTypes/product.type";
declare class ProductRepository {
    getAll(): Promise<any>;
    store(params: IProductSave): Promise<any>;
    update(params: IProductSave, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default ProductRepository;
