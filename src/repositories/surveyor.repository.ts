import $http from "@services/AxiosInstance";
import { Routes } from "@services/Routes";
import { ISurveyorSave } from "@localTypes/surveyor.type";

class SurveyorRepository {
  async getAll() : Promise<any> {
    try {
      const response = await $http.get(Routes.SURVEYORS.INDEX);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async store(params: ISurveyorSave) {
    try {
      const response = await $http.post(Routes.SURVEYORS.STORE, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async update(params: ISurveyorSave, id : string) {
    try {
      const response = await $http.patch(`${Routes.SURVEYORS.UPDATE}/${id}`, params);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

  async delete(id : string) {
    try {
      const response = await $http.delete(`${Routes.SURVEYORS.DELETE}/${id}`);
      return response.data;
    } catch (errors : any) {
      throw errors;
    }
  }

}

export default SurveyorRepository;
