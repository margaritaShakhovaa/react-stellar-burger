import { TIngredient } from "../types/data";

export const ADD_INGREDIENT: 'ADD_INGREDIENT'  = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS: 'SORT_INGREDIENTS' = 'SORT_INGREDIENTS';
export const DELETE_ALL_INGREDIENTS: 'DELETE_ALL_INGREDIENTS' = 'DELETE_ALL_INGREDIENTS';

interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: TIngredient;
}

interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    readonly payload: TIngredient;
}

interface ISortIngredientsAction {
    readonly type: typeof SORT_INGREDIENTS;
    readonly payload: {'fromIndex': number, 'toIndex': number};
}

interface IDeleteAllIngredientsAction {
    readonly type: typeof DELETE_ALL_INGREDIENTS;
}

export type TBurgerConstructorActions = IAddIngredientAction
    | IDeleteIngredientAction
    | ISortIngredientsAction
    | IDeleteAllIngredientsAction;

export const addIngredient = (ingredient: TIngredient): IAddIngredientAction => ({ type: ADD_INGREDIENT, payload: ingredient });
export const deleteIngredient = (ingredient: TIngredient): IDeleteIngredientAction => ({ type: DELETE_INGREDIENT,  payload: ingredient });
export const sortIngredients = (index: { 'fromIndex': number, 'toIndex': number }): ISortIngredientsAction => ({ type: SORT_INGREDIENTS, payload: index });