import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {User} from '../../types/user.type'

interface AuthState {
    user: User | null
}

const initialState: AuthState = {
    user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions
export default authSlice.reducer
