import { getIngredientsRequest } from "../../utils/burgers-api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export const getIngredients = () => {
  return function(dispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    getIngredientsRequest()
        .then(res => {
            dispatch({
              type: GET_INGREDIENTS_SUCCESS,
              ingredients: res.data
            });
        })
        .catch(() => {
          dispatch({ type: GET_INGREDIENTS_FAILED });
        })
  };
};