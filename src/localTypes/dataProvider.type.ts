import { ICurrency } from "./currency.type";
import { GenericModel } from "./genericModel.type";
import { IPackaging } from "./packaging.type";
import { IPaymentMethod } from "./paymentMethod.type";
import { ICountry } from "./places.type";
import { IProduct } from "./product.type";
import { IRole } from "./role.type";
import { ISurveyor } from "./surveyor.type";

export interface dataProviderState {
  roles: IRole[] | [];
  packagings: IPackaging[] | [];
  countries: ICountry[] | [];
  paymentMethods: IPaymentMethod[] | [];
  surveyors: ISurveyor[] | [];
  currencies: ICurrency[] | [];
  companies: any[] | [];
  products: IProduct[] | [];
  prefixs: GenericModel[];
  calibers: GenericModel[];
  categories: GenericModel[];
  contracts: any[];
}

export interface DataProvider {
  errors?: {
    message: string;
  };
  
  dataProviders: dataProviderState
}

export type ModelsDataProvider =
  | "roles"
  | "packagings"
  | "countries"
  | "paymentMethods"
  | "surveyors"
  | "currencies"
  | "companies"
  | "products"
  | "prefixs"
  | "calibers"
  | "categories"
  | "contracts";
