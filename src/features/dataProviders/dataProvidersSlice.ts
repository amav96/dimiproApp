import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Role} from '../../types/role.type'
import { RootState } from 'src/store'
import { Packaging } from 'src/types/packaging.types'

interface dataProviderState {
 roles: Role[] | [],
 packagings: Packaging[] | []
}

const initialState: dataProviderState = {
 roles: [],
 packagings: []
}

export const dataProvidersSlice = createSlice({
  name: 'dataProviders',
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<Role[] | []>) => {
      state.roles = action.payload
    },
    setPackagings: (state, action: PayloadAction<Packaging[] | []>) => {
      state.packagings = action.payload
    },
  },
})


// Action creators are generated for each case reducer function
export const { setRoles, setPackagings } = dataProvidersSlice.actions
export default dataProvidersSlice.reducer
