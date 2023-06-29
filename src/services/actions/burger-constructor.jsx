export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS = 'UPDATE_FILLINGS';

export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';

export const addIngredient = (ingredient) => ({ type: ADD_INGREDIENT, ingredient });
export const deleteIngredient = (index) => ({ type: DELETE_INGREDIENT,  index });
// export const sortIngredients = (dragIndex, hoverIndex) => ({ type: SORT_INGREDIENTS, dragIndex, hoverIndex });