import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, RootState, AppThunk } from '.';

export const useDispatch: () => AppDispatch | AppThunk = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;