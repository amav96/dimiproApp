import $http from "../services/AxiosInstance";
import { Routes } from "@services/utils/Routes";
import { DataProvider } from "src/types/dataProvider.type";

interface Params {
  models: any
}
class DataProviderRepository {
  async index(params: Params) : Promise<DataProvider> {
    try {
      const response = await $http.get(Routes.DATA_PROVIDER.INDEX, {params});
      return response.data;
    } catch (errors : any) {
      return errors;
    }
  }


}

export default DataProviderRepository;
