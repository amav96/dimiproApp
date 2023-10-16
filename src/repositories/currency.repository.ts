import $http from "@services/AxiosInstance";
import { Routes } from "@services/utils/Routes";
import { ICurrencySave } from "src/types/currency.type";


class CurrencyRepository {
  async getAll() : Promise<any> {
    try {
      const response = await $http.get(Routes.CURRENCIES.INDEX);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async store(params: ICurrencySave) {
    try {
      const response = await $http.post(Routes.CURRENCIES.STORE, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async update(params: ICurrencySave, id : string) {
    try {
      const response = await $http.patch(`${Routes.CURRENCIES.UPDATE}/${id}`, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async delete(id : string) {
    try {
      const response = await $http.delete(`${Routes.CURRENCIES.DELETE}/${id}`);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

}

export default CurrencyRepository;
