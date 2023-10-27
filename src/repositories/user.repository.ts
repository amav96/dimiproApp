import $http from "@services/AxiosInstance";
import { Routes } from "@services/utils/Routes";
import { ISaveUser } from "src/types/user.type";


class UserRepository {
  async getAll(params: any = {}) : Promise<any> {
    try {
      const response = await $http.get(Routes.USERS.INDEX, {params});
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async store(params: ISaveUser) {
    try {
      const response = await $http.post(Routes.USERS.STORE, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async update(params: ISaveUser, id : string) {
    try {
      const response = await $http.patch(`${Routes.USERS.UPDATE}/${id}`, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async delete(id : string) {
    try {
      const response = await $http.delete(`${Routes.USERS.DELETE}/${id}`);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

}

export default UserRepository;
