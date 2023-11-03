import $http from "../services/AxiosInstance";
// import { ErrorApi } from "../@localTypes/Api";
import { IUser } from '@localTypes/user.type';
import { Routes } from "@services/Routes";

interface ResponseLogin {
    errors : {
      message?: string,
      email?: string[],
      password?: string[]
    }
    token?: string,
    user? : IUser,
    permissions? : string[],
    refresh?: string
}

class AuthenticationRepository {
  async login(params: any) : Promise<ResponseLogin> {
    try {
      const response = await $http.post(Routes.AUTH.LOGIN, params);
      return response.data;
    } catch (errors : any) {
      throw errors.response
    }
  }

  async permissions(): Promise<{permissions : string[] , user: IUser ,errors?: any}> {
    try {
      const response = await $http.get(Routes.AUTH.PERMISSIONS);
      return response.data;
    } catch (errors : any) {
      throw errors
    }
  }

  async logout() : Promise<ResponseLogin> {
    try {
      const response = await $http.post("api/logout");
      return response.data;
    } catch (errors : any) {
      return errors;
    }
  }

  async checkToken() : Promise<ResponseLogin> {
    try {
      const response = await $http.post("api/checkToken");
      return response.data;
    } catch (errors : any) {
      return errors;
    }
  }

}

export default AuthenticationRepository;
