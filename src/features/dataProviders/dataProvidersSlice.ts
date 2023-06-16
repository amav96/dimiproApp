import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Role} from '../../types/role.type'
import { Packaging } from '../..//types/packaging.types'
import { Country } from '../../types/places.type'

interface dataProviderState {
 roles: Role[] | [],
 packagings: Packaging[] | [],
 countries: Country[] | []
}

const initialState: dataProviderState = {
 roles: [],
 packagings: [],
 countries: []
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
    setCountries: (state, action: PayloadAction<Country[] | []>) => {
      state.countries = action.payload
    },
  },
})


// Action creators are generated for each case reducer function
export const { setRoles, setPackagings, setCountries  } = dataProvidersSlice.actions
export default dataProvidersSlice.reducer
