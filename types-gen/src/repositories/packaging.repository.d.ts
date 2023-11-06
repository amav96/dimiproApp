import { IPackagingSave } from "@localTypes/packaging.type";
declare class PackagingRepository {
    getAll(): Promise<any>;
    store(params: IPackagingSave): Promise<any>;
    update(params: IPackagingSave, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default PackagingRepository;
