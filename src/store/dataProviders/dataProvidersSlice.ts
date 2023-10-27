import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../../types/role.type";
import { IPackaging } from "../../types/packaging.type";
import { ICountry } from "../../types/places.type";
import { IPaymentMethod } from "../../types/paymentMethod.type";
import { ISurveyor } from "../../types/surveyor.type";
import { ICurrency } from "../../types/currency.type";
import { IProduct } from "../../types/product.type";
import { GenericModel } from "../../types/genericModel.type";
import { dataProviderState } from "../../types/dataProvider.type";

const initialState: dataProviderState = {
  roles: [],
  packagings: [],
  countries: [],
  paymentMethods: [],
  surveyors: [],
  currencies: [],
  companies: [],
  products: [],
  prefixs: [],
  calibers: [],
  categories: [],
  contracts: []
};

export const dataProvidersSlice = createSlice({
  name: "dataProviders",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<Role[] | []>) => {
      state.roles = action.payload;
    },
    setPackagings: (state, action: PayloadAction<IPackaging[] | []>) => {
      state.packagings = action.payload;
    },
    setCountries: (state, action: PayloadAction<ICountry[] | []>) => {
      state.countries = action.payload;
    },
    setPaymentMethods: (state, action: PayloadAction<IPaymentMethod[] | []>) => {
      state.paymentMethods = action.payload;
    },
    setSurveyors: (state, action: PayloadAction<ISurveyor[] | []>) => {
      state.surveyors = action.payload;
    },
    setCurrencies: (state, action: PayloadAction<ICurrency[] | []>) => {
      state.currencies = action.payload;
    },
    setCompanies: (state, action: PayloadAction<any[] | []>) => {
      state.companies = action.payload;
    },
    setProducts: (state, action: PayloadAction<IProduct[] | []>) => {
      state.products = action.payload;
    },
    setPrefixs: (state, action: PayloadAction<GenericModel[] | []>) => {
      state.prefixs = action.payload;
    },
    setCalibers: (state, action: PayloadAction<GenericModel[] | []>) => {
      state.calibers = action.payload;
    },
    setCategories: (state, action: PayloadAction<GenericModel[] | []>) => {
      state.categories = action.payload;
    },
    setContracts: (state, action: PayloadAction<any[] | []>) => {
      state.contracts = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setRoles,
  setPackagings,
  setCountries,
  setPaymentMethods,
  setSurveyors,
  setCurrencies,
  setCompanies,
  setProducts,
  setPrefixs,
  setCalibers,
  setCategories,
  setContracts
} = dataProvidersSlice.actions;
export default dataProvidersSlice.reducer;
