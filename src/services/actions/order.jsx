import {getOrderNumberRequest, getOrderRequest} from "../../utils/burgers-api";

export const CREATE_ORDER_NUMBER_REQUEST = 'CREATE_ORDER_NUMBER_REQUEST';
export const CREATE_ORDER_NUMBER_FAILED = 'CREATE_ORDER_NUMBER_FAILED';
export const CREATE_ORDER_NUMBER_SUCCESS = 'CREATE_ORDER_NUMBER_SUCCESS';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const createOrderNumber = (ingredientsId) => {
  return function(dispatch) {
    dispatch({ type: CREATE_ORDER_NUMBER_REQUEST });
    getOrderNumberRequest(ingredientsId)
        .then(({ success, order: { number } }) => {
          if (success) {
            dispatch({
              type: CREATE_ORDER_NUMBER_SUCCESS,
              order: number
            });
          } else {
            dispatch({ type: CREATE_ORDER_NUMBER_FAILED });
          }
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
          if (res.success) {
            dispatch({
              type: GET_ORDER_SUCCESS,
              payload: res.orders[0],
            });
          } else {
            dispatch({ type: GET_ORDER_FAILED });
          }
        })
        .catch(() => {
          dispatch({ type: GET_ORDER_FAILED });
        });
  };
}