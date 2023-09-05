import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS, TIngredientsActions
} from "../actions/ingredients";
import { TIngredient } from "../types/data";

export type TIngredientsInitialState = {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};

const initialState: TIngredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
};

export const ingredientsReducer = (state: TIngredientsInitialState = initialState, action: TIngredientsActions) => {
  switch(action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: false,
        ingredients: action.payload
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredients: [],
        ingredientsFailed: true,
        ingredientsRequest: false
      };
    }
    default:
      return state;
  }
};