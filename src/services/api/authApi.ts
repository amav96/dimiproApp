import $http from "../AxiosInstance";
// import { ErrorApi } from "../../types/Api";
import { User } from "../../types/user.type";
import { Permission } from "../../types/permission.type";
import { Routes } from "@services/utils/Routes";


interface ResponseLogin {
    error? : {
        errors : any
    },
    token?: string,
    user? : User,
    permissions? : Permission[],
    access?: string,
    refresh?: string
}

class AuthenticationApi {
  async login(params: any) : Promise<ResponseLogin> {
    try {
      const response = await $http.post(Routes.AUTH.LOGIN, params);
      return response.data;
    } catch (error : any) {
      return { error };
    }
  }

  async logout() : Promise<ResponseLogin> {
    try {
      const response = await $http.post("api/logout");
      return response.data;
    } catch (error : any) {
      return { error };
    }
  }

  async checkToken() : Promise<ResponseLogin> {
    try {
      const response = await $http.post("api/checkToken");
      return response.data;
    } catch (error : any) {
      return { error };
    }
  }

}

export default AuthenticationApi;
