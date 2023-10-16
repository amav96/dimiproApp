import $http from "@services/AxiosInstance";
import { Routes } from "@services/utils/Routes";
import { IPackagingSave } from "src/types/packaging.type";

class PackagingRepository {
  async getAll() : Promise<any> {
    try {
      const response = await $http.get(Routes.PACKAGINGS.INDEX);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async store(params: IPackagingSave) {
    try {
      const response = await $http.post(Routes.PACKAGINGS.STORE, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async update(params: IPackagingSave, id : string) {
    try {
      const response = await $http.patch(`${Routes.PACKAGINGS.UPDATE}/${id}`, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async delete(id : string) {
    try {
      const response = await $http.delete(`${Routes.PACKAGINGS.DELETE}/${id}`);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

}

export default PackagingRepository;
