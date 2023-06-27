import { getOrderNumberRequest } from "../../utils/burgers-api";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';

export const getOrder = (ingredientsId) => {
  return function(dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    getOrderNumberRequest(ingredientsId)
        .then(({ success, order: { number } }) => {
          if (success) {
            dispatch({
              type: GET_ORDER_SUCCESS,
              order: number
          });
          } else {
            dispatch({ type: GET_ORDER_FAILED });
          }
        });
    };
}