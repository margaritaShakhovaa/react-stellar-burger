import {getOrderNumberRequest, getOrderRequest} from "../../utils/burgers-api";
import {DELETE_ALL_INGREDIENTS} from "./burger-constructor";

export const CREATE_ORDER_NUMBER_REQUEST = 'CREATE_ORDER_NUMBER_REQUEST';
export const CREATE_ORDER_NUMBER_FAILED = 'CREATE_ORDER_NUMBER_FAILED';
export const CREATE_ORDER_NUMBER_SUCCESS = 'CREATE_ORDER_NUMBER_SUCCESS';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const createOrderNumber = (ingredientsId) => {
  return function(dispatch) {
    dispatch({ type: CREATE_ORDER_NUMBER_REQUEST });
    getOrderNumberRequest(ingredientsId)
        .then(({ order: { number } }) => {
            dispatch({
              type: CREATE_ORDER_NUMBER_SUCCESS,
              order: number
            });
        })
        .catch(() => {
          dispatch({ type: CREATE_ORDER_NUMBER_FAILED });
        });
  };
};

export function getOrder(number) {
  return function (dispatch) {
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
}