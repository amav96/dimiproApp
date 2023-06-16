import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { selectPermissions } from "@store/auth/authSlice";
import AuthenticationRepository from "@repositories/auth.repository";
import {setPermissions} from '@store/auth/authSlice'
import { useAppSelector, useAppDispatch } from "../hooks";

const authenticationRepository = new AuthenticationRepository()
export default function usePermissions () {

  const dispatch = useAppDispatch()
  const permissions = useSelector(selectPermissions);

  const hasPermissions = async (permission: string[] | string) : Promise<boolean>=> {
    if(!permissions || permissions.length === 0){
       const {
        permissions: serverPermissions ,
       } = await authenticationRepository.permissions()
       if(serverPermissions && serverPermissions.length > 0){
        dispatch(setPermissions(serverPermissions))
       }
        if(typeof permission === 'string'){
          // console.log(serverPermissions.includes(permission))
          return serverPermissions.includes(permission)
        } else {
          return true //aca debo implementar logica para machear el array d permissions
        }
    } else {
      return permissions.includes(permission)
    }
    
  }

  return {
    hasPermissions
  }
}