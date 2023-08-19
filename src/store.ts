import { configureStore } from '@reduxjs/toolkit'
import {combineReducers, Store} from 'redux';
import authReducer from './store/auth/authSlice'
import dataProvidersReducer from './store/dataProviders/dataProvidersSlice'

export const store: Store =  configureStore({
  reducer: {
    auth: authReducer,
    dataProviders: dataProvidersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch