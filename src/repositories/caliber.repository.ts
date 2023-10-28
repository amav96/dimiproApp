import $http from "@services/AxiosInstance";
import { Routes } from "@services/Routes";
import { ICaliberSave } from "@localTypes/caliber.type";


class CaliberRepository {
  async getAll() : Promise<any> {
    try {
      const response = await $http.get(Routes.CALIBERS.INDEX);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async store(params: ICaliberSave) {
    try {
      const response = await $http.post(Routes.CALIBERS.STORE, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async update(params: ICaliberSave, id : string) {
    try {
      const response = await $http.patch(`${Routes.CALIBERS.UPDATE}/${id}`, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async delete(id : string) {
    try {
      const response = await $http.delete(`${Routes.CALIBERS.DELETE}/${id}`);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

}

export default CaliberRepository;
