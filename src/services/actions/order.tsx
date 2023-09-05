import { getOrderNumberRequest, getOrderRequest } from "../../utils/burgers-api";
import { DELETE_ALL_INGREDIENTS } from "./burger-constructor";
import { TIngredient, TOrder } from "../types/data";
import { AppDispatch, AppThunk } from "../types";

export const CREATE_ORDER_NUMBER_REQUEST: 'CREATE_ORDER_NUMBER_REQUEST' = 'CREATE_ORDER_NUMBER_REQUEST';
export const CREATE_ORDER_NUMBER_FAILED: 'CREATE_ORDER_NUMBER_FAILED' = 'CREATE_ORDER_NUMBER_FAILED';
export const CREATE_ORDER_NUMBER_SUCCESS: 'CREATE_ORDER_NUMBER_SUCCESS' = 'CREATE_ORDER_NUMBER_SUCCESS';
export const DELETE_ORDER_NUMBER: 'DELETE_ORDER_NUMBER' = 'DELETE_ORDER_NUMBER';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export const ADD_INGREDIENT_ID: 'ADD_INGREDIENT_ID' = 'ADD_INGREDIENT_ID';

export interface IAddIngredientId {
    readonly type: typeof ADD_INGREDIENT_ID;
    readonly payload: TIngredient['_id'];
}

interface ICreateOrderNumberRequestAction {
    readonly type: typeof CREATE_ORDER_NUMBER_REQUEST;
}

interface ICreateOrderNumberFailedAction {
    readonly type: typeof CREATE_ORDER_NUMBER_FAILED;
}

interface ICreateOrderNumberSuccessAction {
    readonly type: typeof CREATE_ORDER_NUMBER_SUCCESS;
    readonly payload: number;
}

interface IDeleteOrderNumberAction {
    readonly type: typeof DELETE_ORDER_NUMBER;
}

interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly payload: TOrder;
}

export type TOrderActions = ICreateOrderNumberRequestAction
    | ICreateOrderNumberFailedAction
    | ICreateOrderNumberSuccessAction
    | IDeleteOrderNumberAction
    | IGetOrderRequestAction
    | IGetOrderFailedAction
    | IGetOrderSuccessAction
    | IAddIngredientId;

export const createOrderNumber: AppThunk = (ingredientsId: string[]) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: CREATE_ORDER_NUMBER_REQUEST });
    getOrderNumberRequest(ingredientsId)
        .then((res) => {
            dispatch({
              type: CREATE_ORDER_NUMBER_SUCCESS,
              payload: res.order.number,
            });
        })
        .catch(() => {
          dispatch({ type: CREATE_ORDER_NUMBER_FAILED });
        });
  };
};

export const getOrder: AppThunk = (number: string | undefined) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    getOrderRequest(number)
        .then((res) => {
            dispatch({
              type: GET_ORDER_SUCCESS,
              payload: res.orders[0],
            });
            dispatch({ type: DELETE_ALL_INGREDIENTS });
        })
        .catch(() => {
          dispatch({ type: GET_ORDER_FAILED });
          dispatch({ type: DELETE_ALL_INGREDIENTS });
        });
  };
};

export const addIngredientId = (ingredient: TIngredient): IAddIngredientId => {
    return {
        type: ADD_INGREDIENT_ID,
        payload: ingredient._id
    }
}