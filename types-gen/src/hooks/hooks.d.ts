import { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
export declare const useAppDispatch: () => AppDispatch;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
