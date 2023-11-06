import { ICaliberSave } from "@localTypes/caliber.type";
declare class CaliberRepository {
    getAll(): Promise<any>;
    store(params: ICaliberSave): Promise<any>;
    update(params: ICaliberSave, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default CaliberRepository;
