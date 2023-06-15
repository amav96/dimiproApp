import { useEffect } from "react";
import {setRoles, setPackagings} from '@features/dataProviders/dataProvidersSlice'
import { useAppSelector, useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/store";
import { ModelsDataProvider } from "src/types/dataProvider.type";
import DataProviderRepository from "@repositories/dataProvider.repository";
import {  toast } from 'react-toastify';

const dataProviderController = new DataProviderRepository()
export default function useDataProvider () {
 
  const dispatch = useAppDispatch()
  const roles = useAppSelector((state: RootState) => state.dataProviders.roles)
  const packagings = useAppSelector((state: RootState) => state.dataProviders.packagings)
  
  let requestModels: ModelsDataProvider[] = []

  const getDataProviders = async (models: ModelsDataProvider[]) => {
    models.forEach((model : string) => {
        if(model === 'roles' && roles.length === 0){
            requestModels.push('roles')
        }
        if(model === 'packagings' && packagings.length === 0){
            requestModels.push('packagings')
        }
    })

    const response = await dataProviderController.index({models: requestModels.toString()})
    if(response.errors){
      toast(`🦄 ${response.errors.message || 'Ha ocurrido un error al traer los proveedores de data'}`, {
          autoClose: 2000,
      });
    } else {
      Object.keys(response.dataProviders).forEach((k) => {
        if(k === 'roles'){
          dispatch(setRoles(response.dataProviders.roles))
        }
        if(k === 'packagings'){
          dispatch(setPackagings(response.dataProviders.packagings))
        }
      })
    }
  }

 
  return {
    getDataProviders
  }
}