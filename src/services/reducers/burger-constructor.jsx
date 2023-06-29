import {
  ADD_INGREDIENT,
  DECREASE_COUNT,
  DELETE_INGREDIENT,
  INCREASE_COUNT,
  SORT_INGREDIENTS
} from "../actions/burger-constructor";

const initialState = {
  buns: null,
  fillings: [],
  count: {}
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.ingredient.type === 'bun') {
        return {
          buns: action.ingredient,
          fillings: state.fillings
        };
      } else {
          return {
            ...state,
          fillings: [...state.fillings, action.ingredient]
        };
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        fillings: state.fillings.filter(filling => filling._id !== action.id)
      };
    }
    case SORT_INGREDIENTS: {
      const dragIngredient = state.fillings[action.dragIndex];
      const hoverIngredient = state.fillings[action.hoverIndex];
      state.fillings[action.dragIndex] = hoverIngredient;
      state.fillings[action.hoverIndex] = dragIngredient;
      return {
        ...state
      };
    }

    case INCREASE_COUNT: {
      return {
        ...state,
        count: {
          ...state.count,
          [action._id]: state.count[action._id]
              ? ++state.count[action._id]
              : 1
        }
      };
    }
    case DECREASE_COUNT: {
      return {
        ...state,
        count: {
          ...state.count,
          [action._id]: state.count[action._id]
              ? --state.count[action._id]
              : 1
        }
      };
    }
    default:
      return state;
  }
}