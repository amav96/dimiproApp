import { Currency } from "./currency.type";
import { GenericModel } from "./genericModel.type";
import { Packaging } from "./packaging.type";
import { PaymentMethod } from "./paymentMethod.type";
import { Country } from "./places.type";
import { Product } from "./product.type";
import { Role } from "./role.type";
import { Surveyor } from "./surveyor.type";
export interface dataProviderState {
    roles: Role[] | [];
    packagings: Packaging[] | [];
    countries: Country[] | [];
    paymentMethods: PaymentMethod[] | [];
    surveyors: Surveyor[] | [];
    currencies: Currency[] | [];
    companies: any[] | [];
    products: Product[] | [];
    prefixs: GenericModel[];
    calibers: GenericModel[];
    categories: GenericModel[];
    contracts: any[];
}
export interface DataProvider {
    errors?: {
        message: string;
    };
    dataProviders: dataProviderState;
}
export type ModelsDataProvider = "roles" | "packagings" | "countries" | "paymentMethods" | "surveyors" | "currencies" | "companies" | "products" | "prefixs" | "calibers" | "categories" | "contracts";
