declare class ContractRepository {
    getAll(params?: any): Promise<any>;
    store(params: FormData): Promise<any>;
    update(params: FormData, id: string): Promise<any>;
    delete(id: string): Promise<any>;
    addDocument(params: FormData, idContract: string): Promise<any>;
    removeDoc(idContract: string, idDoc: string): Promise<any>;
}
export default ContractRepository;
