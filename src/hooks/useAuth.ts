import { useAppSelector } from '@hooks/hooks';
import { selectAuthLoader, selectUser } from "@store/auth/authSlice";
import { useSelector } from 'react-redux';
import { selectPermissions, setUser, setAuthLoader } from "@store/auth/authSlice";
import AuthenticationRepository from "@repositories/auth.repository";
import {setPermissions} from '@store/auth/authSlice'
import { useAppDispatch } from "./hooks";
import {  toast } from 'react-toastify';

const authenticationRepository = new AuthenticationRepository()
export function useAuth() {
  const user = useAppSelector(selectUser);

  const isAuth = () => null !== user && undefined !== user;

  const authLoader = () => useAppSelector(selectAuthLoader);

  const dispatch = useAppDispatch()
  const permissions = useSelector(selectPermissions);

  const hasOrGetPermissions = async (permission: string[] | string) : Promise<boolean>=> {
    if(!permissions || permissions.length === 0){
          try {
            dispatch(setAuthLoader(true))
            const {
              permissions: serverPermissions,
              user,
              errors
             } = await authenticationRepository.permissions()
             if(errors){
               if(errors.message === 'User no authenticated'){
                toast(`🦄 ${errors.message || 'You are not authenticated'}`, {
                  position: "top-right",
                  autoClose: 1000,
                });
                return false
               }
               toast(`🦄 ${errors.message || 'You are not authenticated'}`, {
                  position: "top-right",
                  autoClose: 1000,
                });
                return false
             } else {
              if(serverPermissions && serverPermissions.length > 0){
                dispatch(setPermissions(serverPermissions))
               }
               if(user && Object.keys(user).length > 0){
                dispatch(setUser(user))
               }
              if(typeof permission === 'string'){
                return serverPermissions.includes(permission)
              } else {
                return true //aca debo implementar logica para machear el array d permissions
              }
             }
          } catch (error : any) {
            return false
          } finally {
            dispatch(setAuthLoader(false))
          }
    } else {
      return permissions.includes(permission)
    }
  }

  const hasPermissions = (permission: string[] | string) : boolean => {

    return permissions.includes(permission)
  }

  return {
    isAuth,
    authLoader,
    hasOrGetPermissions,
    hasPermissions
  }

}