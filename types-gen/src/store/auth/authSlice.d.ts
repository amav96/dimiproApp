import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../@localTypes/user.type';
import { RootState } from '../store';
interface AuthState {
    user: IUser | null;
    permissions: string[];
    token: string;
    authLoader: boolean;
}
export declare const authSlice: import("@reduxjs/toolkit").Slice<AuthState, {
    setUser: (state: import("immer/dist/internal").WritableDraft<AuthState>, action: PayloadAction<IUser | null>) => void;
    setPermissions: (state: import("immer/dist/internal").WritableDraft<AuthState>, action: PayloadAction<string[]>) => void;
    setToken: (state: import("immer/dist/internal").WritableDraft<AuthState>, action: PayloadAction<string>) => void;
    setAuthLoader: (state: import("immer/dist/internal").WritableDraft<AuthState>, action: PayloadAction<boolean>) => void;
}, "auth">;
export declare const selectUser: (state: RootState) => any;
export declare const selectPermissions: (state: RootState) => any;
export declare const selectToken: (state: RootState) => any;
export declare const selectAuthLoader: (state: RootState) => any;
export declare const editUser: (updatedUser: IUser) => (dispatch: any, getState: any) => void;
export declare const setUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "auth/setUser">, setPermissions: import("@reduxjs/toolkit").ActionCreatorWithPayload<string[], "auth/setPermissions">, setToken: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "auth/setToken">, setAuthLoader: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "auth/setAuthLoader">;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
