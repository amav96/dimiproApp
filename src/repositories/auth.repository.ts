import $http from "../services/AxiosInstance";
// import { ErrorApi } from "../../types/Api";
import { User } from "../types/user.type";
import { Routes } from "@services/utils/Routes";


interface ResponseLogin {
    errors : any
    token?: string,
    user? : User,
    permissions? : string[],
    refresh?: string
}

class AuthenticationRepository {
  async login(params: any) : Promise<ResponseLogin> {
    try {
      const response = await $http.post(Routes.AUTH.LOGIN, params);
      return response.data;
    } catch (errors : any) {
      return errors;
    }
  }

  async permissions(): Promise<{permissions : string[] , errors?: any}> {
    try {
      const response = await $http.get(Routes.AUTH.PERMISSIONS);
      return response.data;
    } catch (errors : any) {
      return errors;
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
