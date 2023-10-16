import $http from "@services/AxiosInstance";
import { Routes } from "@services/utils/Routes";
import { IPaymentMethodSave } from "src/types/paymentMethod.type";


class PaymentMethodRepository {
  async getAll() : Promise<any> {
    try {
      const response = await $http.get(Routes.PAYMENTMETHODS.INDEX);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async store(params: IPaymentMethodSave) {
    try {
      const response = await $http.post(Routes.PAYMENTMETHODS.STORE, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async update(params: IPaymentMethodSave, id : string) {
    try {
      const response = await $http.patch(`${Routes.PAYMENTMETHODS.UPDATE}/${id}`, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async delete(id : string) {
    try {
      const response = await $http.delete(`${Routes.PAYMENTMETHODS.DELETE}/${id}`);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

}

export default PaymentMethodRepository;
