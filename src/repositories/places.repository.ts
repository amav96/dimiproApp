import $http from "@services/AxiosInstance";
import { Routes } from "@services/utils/Routes";
import { DataProvider } from "src/types/dataProvider.type";

interface Params {
  models: any
}
class PlaceRepository {
  async index(params: Params) : Promise<DataProvider> {
    try {
      const response = await $http.get(Routes.DATA_PROVIDER.INDEX, {params});
      return response.data;
    } catch (errors : any) {
        throw errors
    }
  }

  async getStatesByCountry (countryId: string | number) {
    try {
        const response = await $http.get(Routes.baseApiUrl+ `states/${countryId}`);
        return response.data;
    } catch (errors : any) {
        throw errors
    }
  }

  async getCitiesByCountryAndState(countryId: number | string, stateId: number | string){
    try {
        const response = await $http.get(Routes.baseApiUrl+ `countries/${countryId}/states/${stateId}/cities`);
        return response.data;
    } catch (errors : any) {
        throw errors
    }
  }


}

export default PlaceRepository;
