import { IUser } from '@localTypes/user.type';
interface ResponseLogin {
    errors: {
        message?: string;
        email?: string[];
        password?: string[];
    };
    token?: string;
    user?: IUser;
    permissions?: string[];
    refresh?: string;
}
declare class AuthenticationRepository {
    login(params: any): Promise<ResponseLogin>;
    permissions(): Promise<{
        permissions: string[];
        user: IUser;
        errors?: any;
    }>;
    logout(): Promise<ResponseLogin>;
    checkToken(): Promise<ResponseLogin>;
}
export default AuthenticationRepository;
