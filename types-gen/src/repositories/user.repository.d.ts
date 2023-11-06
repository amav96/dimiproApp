import { ISaveUser } from "@localTypes/user.type";
declare class UserRepository {
    getAll(params?: any): Promise<any>;
    store(params: ISaveUser): Promise<any>;
    update(params: ISaveUser, id: string): Promise<any>;
    delete(id: string): Promise<any>;
}
export default UserRepository;
