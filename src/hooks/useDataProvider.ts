import {
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
} from '@store/dataProviders/dataProvidersSlice'
import { useAppSelector, useAppDispatch } from "./hooks";

import { ModelsDataProvider } from "src/types/dataProvider.type";
import DataProviderRepository from "@repositories/dataProvider.repository";
import { toast } from 'react-toastify';
import { RootState } from '../store/store';

const dataProviderController = new DataProviderRepository();

export default function useDataProvider() {
  const dispatch = useAppDispatch();

  const dataProviders = {
    roles: {
      state: useAppSelector((state: RootState) => state.dataProviders.roles),
      action: setRoles,
    },
    packagings: {
      state: useAppSelector((state: RootState) => state.dataProviders.packagings),
      action: setPackagings,
    },
    countries: {
      state: useAppSelector((state: RootState) => state.dataProviders.countries),
      action: setCountries,
    },
    paymentMethods: {
      state: useAppSelector((state: RootState) => state.dataProviders.paymentMethods),
      action: setPaymentMethods,
    },
    surveyors: {
      state: useAppSelector((state: RootState) => state.dataProviders.surveyors),
      action: setSurveyors,
    },
    currencies: {
      state: useAppSelector((state: RootState) => state.dataProviders.currencies),
      action: setCurrencies,
    },
    companies: {
      state: useAppSelector((state: RootState) => state.dataProviders.companies),
      action: setCompanies,
    },
    products: {
      state: useAppSelector((state: RootState) => state.dataProviders.products),
      action: setProducts,
    },
    prefixs: {
      state: useAppSelector((state: RootState) => state.dataProviders.prefixs),
      action: setPrefixs,
    },
    calibers: {
      state: useAppSelector((state: RootState) => state.dataProviders.calibers),
      action: setCalibers,
    },
    categories: {
      state: useAppSelector((state: RootState) => state.dataProviders.categories),
      action: setCategories,
    },
    contracts: {
      state: useAppSelector((state: RootState) => state.dataProviders.contracts),
      action: setContracts,
    }
  };

  const getDataProviders = async (models: ModelsDataProvider[]) => {
    const requestModels: ModelsDataProvider[] = models.filter((model) => dataProviders[model].state.length === 0);

    if (requestModels.length > 0) {
      const response = await dataProviderController.index({ models: requestModels.toString() });

      if (response.errors) {
        toast(`🦄 ${response.errors.message || 'Ha ocurrido un error al traer los proveedores de data'}`, {
          autoClose: 2000,
        });
      } else if(response?.dataProviders) {
        Object.keys(response.dataProviders).forEach((k) => {
          if (k in dataProviders) {
            // @ts-ignore
            if(response.dataProviders[k].errors){
              // @ts-ignore
              dispatch(dataProviders[k].action([]));
              // @ts-ignore
            } else if(dataProviders[k]){
              // @ts-ignore
              dispatch(dataProviders[k].action(response.dataProviders[k]));
            }
          }
        });
      }
    }
  };

  return {
    getDataProviders,
  };
}
