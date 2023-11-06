import { ISaveCompany } from "@localTypes/company.type";
declare class CompanyRepository {
    getAll(params?: any): Promise<any>;
    store(params: ISaveCompany): Promise<any>;
    update(params: ISaveCompany, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default CompanyRepository;
