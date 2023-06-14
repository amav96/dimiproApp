import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Role} from '../../types/role.type'
import { RootState } from 'src/store'

interface AuthState {
 roles: Role[] | [],
}

const initialState: AuthState = {
 roles: [{name: 'si', permissions: []}]
}

export const dataProvidersSlice = createSlice({
  name: 'dataProviders',
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<Role[] | []>) => {
      state.roles = action.payload
    },
  },
})


// Action creators are generated for each case reducer function
export const { setRoles } = dataProvidersSlice.actions
export default dataProvidersSlice.reducer
