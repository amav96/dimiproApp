import {  createSlice, PayloadAction } from '@reduxjs/toolkit'
import {IUser} from '@localTypes/user.type'
import { RootState } from '../store';

interface AuthState {
  user: IUser | null,
  permissions: string[],
  token: string,
  authLoader: boolean
}

const initialState: AuthState = {
  user: null,
  permissions: [],
  token : '',
  authLoader: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
    },
    setPermissions: (state, action: PayloadAction<string[]>) => {
      state.permissions = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      if(state.token){
        localStorage.setItem('token', state.token)
      } else {
        localStorage.removeItem('token')
      }
    },
    setAuthLoader : (state, action: PayloadAction<boolean>) => {
      state.authLoader = action.payload
    }
  },
})

export const selectUser = (state: RootState) => state.auth.user;

export const selectPermissions = (state: RootState) => state.auth.permissions;

export const selectToken = (state: RootState) => state.auth.token;

export const selectAuthLoader = (state: RootState) => state.auth.authLoader;

export const editUser = (updatedUser: IUser) => (dispatch: any , getState: any) => {
  dispatch(setUser(updatedUser));
}

// Action creators are generated for each case reducer function
export const { setUser, setPermissions, setToken, setAuthLoader } = authSlice.actions
export default authSlice.reducer
