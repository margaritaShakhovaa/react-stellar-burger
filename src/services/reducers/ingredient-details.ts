import {
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
  TIngredientDetailsActions
} from "../actions/ingredient-details";
import { TIngredient } from "../types/data";

export type TIngredientDetailsInitialState = {
  ingredientDetails: TIngredient | null;
};

const initialState: TIngredientDetailsInitialState = {
  ingredientDetails: null
};

export const ingredientDetailsReducer = (state: TIngredientDetailsInitialState = initialState, action: TIngredientDetailsActions) => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.payload
      };
    }
    case DELETE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: null
      };
    }
    default:
      return state
  }
};