import { ICategorySave } from "@localTypes/category.type";
declare class CategoryRepository {
    getAll(): Promise<any>;
    store(params: ICategorySave): Promise<any>;
    update(params: ICategorySave, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default CategoryRepository;
