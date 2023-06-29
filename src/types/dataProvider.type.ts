import { Currency } from "./currency.type";
import { Packaging } from "./packaging.types";
import { PaymentMethod } from "./paymentMethod.type";
import { Country } from "./places.type";
import { Product } from "./product.type";
import { Role } from "./role.type";
import { Surveyor } from "./surveyor.type";

export interface DataProvider {
  errors?: {
    message: string;
  };
  
  dataProviders: {
    roles: Role[];
    packagings: Packaging[];
    countries: Country[];
    paymentMethods: PaymentMethod[];
    surveyors: Surveyor[];
    currencies: Currency[];
    companies: any[];
    products: Product[];
  };
}

export type ModelsDataProvider =
  | "roles"
  | "packagings"
  | "countries"
  | "paymentMethods"
  | "surveyors"
  | "currencies"
  | "companies"
  | "products";
