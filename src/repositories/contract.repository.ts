import $http from "@services/AxiosInstance";
import { Routes } from "@services/Routes";
import { IContractSave } from "@localTypes/contract.type";


class ContractRepository {
  async getAll(params: any = {}) : Promise<any> {
    try {
      const response = await $http.get(Routes.CONTRACTS.INDEX, {params});
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async store(params: FormData) {
    try {
      const response = await $http.post(Routes.CONTRACTS.STORE, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async update(params: FormData, id : string) {
    try {
      const response = await $http.patch(`${Routes.CONTRACTS.UPDATE}/${id}`, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async delete(id : string) {
    try {
      const response = await $http.delete(`${Routes.CONTRACTS.DELETE}/${id}`);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async addDocument(params: object, idContract : string)  {
    try {
      const response = await $http.post(`${Routes.CONTRACTS.ADD_DOCUMENT}/${idContract}`, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async removeDoc(idContract: string,idDoc : string){
    try {
      const response = await $http.delete(`${Routes.CONTRACTS.REMOVE_DOC}/${idContract}/${idDoc}`);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async generateUrlBucket(name: string, uuid: string, type: string){
    console.log(type)
    try {
      const response = await $http.post(`${Routes.CONTRACTS.GET_URL_BUCKET}`, {
        name,
        uuid,
        type,
      });
      return response.data;
    } catch (errors : any) {
      console.log(errors)
      throw errors;
    }
  }
}

export default ContractRepository;
