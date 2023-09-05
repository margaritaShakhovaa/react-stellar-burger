import { TIngredient } from "../types/data";

export const ADD_INGREDIENT_DETAILS: 'OPEN_INGREDIENT_DETAILS' = 'OPEN_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS: 'CLOSE_INGREDIENT_DETAILS' = 'CLOSE_INGREDIENT_DETAILS';

interface IAddIngredientDetailsAction {
    readonly type: typeof ADD_INGREDIENT_DETAILS;
    readonly payload: TIngredient;
}

interface IDeleteIngredientDetailsAction {
    readonly type: typeof DELETE_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions = IAddIngredientDetailsAction
    | IDeleteIngredientDetailsAction;

