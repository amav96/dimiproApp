import { useEffect } from "react";
import {setRoles} from '@features/dataProviders/dataProvidersSlice'
import { useAppSelector, useAppDispatch } from "../hooks";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { RootState } from "src/store";

export default function useDataProviders () {
 
  const dispatch = useAppDispatch()
  const roles = useAppSelector((state: RootState) => state.dataProviders.roles)

  const test =  () => {
    console.log(roles)
  }
 
  return {
    test
  }
}