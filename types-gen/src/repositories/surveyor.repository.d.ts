import { ISurveyorSave } from "@localTypes/surveyor.type";
declare class SurveyorRepository {
    getAll(): Promise<any>;
    store(params: ISurveyorSave): Promise<any>;
    update(params: ISurveyorSave, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default SurveyorRepository;
