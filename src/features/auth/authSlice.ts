import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {User} from '../../types/user.type'
import { RootState } from 'src/store'

interface AuthState {
  user: User | null,
  permissions: string[],
  token: string,
}

const initialState: AuthState = {
  user: null,
  permissions: [],
  token : ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
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
  },
})

export const selectUser = (state: RootState) => state.auth.user;

export const selectPermissions = (state: RootState) => state.auth.permissions;

export const selectToken = (state: RootState) => state.auth.token;

// Action creators are generated for each case reducer function
export const { setUser, setPermissions, setToken } = authSlice.actions
export default authSlice.reducer
