import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../../types/role.type";
import { Packaging } from "../../types/packaging.types";
import { Country } from "../../types/places.type";
import { PaymentMethod } from "../../types/paymentMethod.type";
import { Surveyor } from "../../types/surveyor.type";
import { Currency } from "../../types/currency.type";
import { Product } from "../../types/product.type";
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
  prefixs: []
};

export const dataProvidersSlice = createSlice({
  name: "dataProviders",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<Role[] | []>) => {
      state.roles = action.payload;
    },
    setPackagings: (state, action: PayloadAction<Packaging[] | []>) => {
      state.packagings = action.payload;
    },
    setCountries: (state, action: PayloadAction<Country[] | []>) => {
      state.countries = action.payload;
    },
    setPaymentMethods: (state, action: PayloadAction<PaymentMethod[] | []>) => {
      state.paymentMethods = action.payload;
    },
    setSurveyors: (state, action: PayloadAction<Surveyor[] | []>) => {
      state.surveyors = action.payload;
    },
    setCurrencies: (state, action: PayloadAction<Currency[] | []>) => {
      state.currencies = action.payload;
    },
    setCompanies: (state, action: PayloadAction<any[] | []>) => {
      state.companies = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[] | []>) => {
      state.products = action.payload;
    },
    setPrefixs: (state, action: PayloadAction<GenericModel[] | []>) => {
      state.prefixs = action.payload;
    },
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
} = dataProvidersSlice.actions;
export default dataProvidersSlice.reducer;
