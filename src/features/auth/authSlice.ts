import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {User} from '../../types/user.type'

interface AuthState {
  user: User | null,
  permissions: string[],
  access: string,
}

const initialState: AuthState = {
  user: null,
  permissions: [],
  access : ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setPermissions: (state, action: PayloadAction<string[]>) => {
      console.log('set permi')
      state.permissions = action.payload
    },
    setAccess: (state, action: PayloadAction<string>) => {
      state.access = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setPermissions, setAccess } = authSlice.actions
export default authSlice.reducer
