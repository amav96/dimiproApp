import $http from "@services/AxiosInstance";
import { Routes } from "@services/Routes";
import { ISaveCompany } from "@localTypes/company.type";


class CompanyRepository {
  async getAll(params: any = {}) : Promise<any> {
    try {
      const response = await $http.get(Routes.COMPANIES.INDEX, {params});
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async store(params: ISaveCompany) {
    try {
      const response = await $http.post(Routes.COMPANIES.STORE, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async update(params: ISaveCompany, id : string) {
    try {
      const response = await $http.patch(`${Routes.COMPANIES.UPDATE}/${id}`, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async delete(id : string) {
    try {
      const response = await $http.delete(`${Routes.COMPANIES.DELETE}/${id}`);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

}

export default CompanyRepository;
