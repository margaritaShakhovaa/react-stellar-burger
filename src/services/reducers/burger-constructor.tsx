import {
  ADD_INGREDIENT,
  DELETE_ALL_INGREDIENTS,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
  TBurgerConstructorActions
} from "../actions/burger-constructor";
import { TIngredient } from "../types/data";

export type TBurgerConstructorInitialState = {
  buns: TIngredient | null;
  fillings: TIngredient[];
};

const initialState: TBurgerConstructorInitialState = {
  buns: null,
  fillings: [],
};

export const burgerConstructorReducer = (state: TBurgerConstructorInitialState = initialState, action: TBurgerConstructorActions): TBurgerConstructorInitialState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.payload.type === 'bun') {
        return {
          buns: action.payload,
          fillings: state.fillings
        };
      } else {
          return {
            ...state,
          fillings: [...state.fillings, action.payload]
        };
      }
    }
    case DELETE_INGREDIENT: {
      const index = state.fillings.indexOf(action.payload);
      if (index > -1) {
        state.fillings.splice(index, 1);
      }
      return {
        ...state,
        fillings: [...state.fillings]
      };
    }
    case SORT_INGREDIENTS: {
      const main = [...state.fillings];
      main.splice(action.payload.toIndex, 0, main.splice(action.payload.fromIndex, 1)[0]);
      return {
        ...state,
        fillings: [...main]
      };
    }
    case DELETE_ALL_INGREDIENTS: {
      return {
        ...state,
        ...initialState
      };
    }
    default:
      return state;
  }
};