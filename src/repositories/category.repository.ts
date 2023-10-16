import $http from "@services/AxiosInstance";
import { Routes } from "@services/utils/Routes";
import { ICategorySave } from "src/types/category.type";


class CategoryRepository {
  async getAll() : Promise<any> {
    try {
      const response = await $http.get(Routes.CATEGORIES.INDEX);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async store(params: ICategorySave) {
    try {
      const response = await $http.post(Routes.CATEGORIES.STORE, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async update(params: ICategorySave, id : string) {
    try {
      const response = await $http.patch(`${Routes.CATEGORIES.UPDATE}/${id}`, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async delete(id : string) {
    try {
      const response = await $http.delete(`${Routes.CATEGORIES.DELETE}/${id}`);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

}

export default CategoryRepository;
