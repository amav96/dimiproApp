import { Store } from 'redux';
export declare const store: Store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
