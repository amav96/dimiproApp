import axios, { AxiosError, AxiosRequestConfig } from "axios";
import baseApiUrl from "./BaseApiUrl";
import { authorization } from "./Autorizathion";

const $http = axios.create({
  baseURL: baseApiUrl,
});

const handleError = (error: AxiosError) => {
  if (axios.isAxiosError(error)) {
    if (error.code !== "200" && error.code !== "201") {
      throw error
    }
  }else {
    throw {
        error: {
          message: "Error de peticion",
        },
    }
  }
};

$http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return handleError(error);
  }
);

$http.interceptors.request.use(
  async (config) => {
    config.headers = config.headers ?? {};
    const auth = authorization();
    if (auth) {
      config.headers.Authorization = auth;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default $http;

