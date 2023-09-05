import { getIngredientsRequest } from "../../utils/burgers-api";
import { TIngredient } from "../types/data";
import { AppDispatch, AppThunk } from "../types";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';

interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: TIngredient[];
}

export type TIngredientsActions = IGetIngredientsRequestAction
    | IGetIngredientsFailedAction
    | IGetIngredientsSuccessAction;

export const getIngredients: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    getIngredientsRequest()
        .then(res => {
            dispatch({
              type: GET_INGREDIENTS_SUCCESS,
              payload: res.data
            });
        })
        .catch(() => {
          dispatch({ type: GET_INGREDIENTS_FAILED });
        })
  };
};