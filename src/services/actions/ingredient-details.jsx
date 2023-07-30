export const ADD_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

export const addIngredientDetails = (card) => ({ type: ADD_INGREDIENT_DETAILS, payload: card });
export const deleteIngredientDetails = () => ({ type: DELETE_INGREDIENT_DETAILS });