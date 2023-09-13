import { useSelector } from 'react-redux';
import { selectPermissions } from "@store/auth/authSlice";
import AuthenticationRepository from "@repositories/auth.repository";
import {setPermissions} from '@store/auth/authSlice'
import { useAppSelector, useAppDispatch } from "../hooks";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const authenticationRepository = new AuthenticationRepository()
export default function usePermissions () {

  const dispatch = useAppDispatch()
  const permissions = useSelector(selectPermissions);
  const navigate = useNavigate()

  const hasOrGetPermissions = async (permission: string[] | string) : Promise<boolean>=> {
    if(!permissions || permissions.length === 0){
          try {
            const {
              permissions: serverPermissions ,
              errors
             } = await authenticationRepository.permissions()
             console.log(errors)
             if(errors){
               if(errors.message === 'User no authenticated'){
                toast(`🦄 ${errors.message || 'You are not authenticated'}`, {
                  position: "top-right",
                  autoClose: 1000,
                });
                navigate('/login')
                return false
               }
               toast(`🦄 ${errors.message || 'You are not authenticated'}`, {
                  position: "top-right",
                  autoClose: 1000,
                });
                navigate('/acceso-denegado')
                return false
             } else {
              if(serverPermissions && serverPermissions.length > 0){
                dispatch(setPermissions(serverPermissions))
               }
                if(typeof permission === 'string'){
                  // console.log(serverPermissions.includes(permission))
                  return serverPermissions.includes(permission)
                } else {
                  return true //aca debo implementar logica para machear el array d permissions
                }
             }
          } catch (error : any) {
            navigate('/login')
            return false
          }
    } else {
      return permissions.includes(permission)
    }
  }

  const hasPermissions = (permission: string[] | string) : boolean => {
    return permissions.includes(permission)
  }

  return {
    hasOrGetPermissions,
    hasPermissions
  }
}