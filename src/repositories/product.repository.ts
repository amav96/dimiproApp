import $http from "@services/AxiosInstance";
import { Routes } from "@services/utils/Routes";
import { IProductSave } from "src/types/product.type";


class ProductRepository {
  async getAll() : Promise<any> {
    try {
      const response = await $http.get(Routes.PRODUCTS.INDEX);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async store(params: IProductSave) {
    try {
      const response = await $http.post(Routes.PRODUCTS.STORE, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async update(params: IProductSave, id : string) {
    try {
      const response = await $http.patch(`${Routes.PRODUCTS.UPDATE}/${id}`, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async delete(id : string) {
    try {
      const response = await $http.delete(`${Routes.PRODUCTS.DELETE}/${id}`);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

}

export default ProductRepository;
