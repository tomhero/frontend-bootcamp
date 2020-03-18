import { OrderableIngredients } from "../models/Burger";

export interface Ingredient {
    ingredients: OrderableIngredients;
    totalPrice: number;
}
 
export enum IngredientActions {
    ADD = 'ADD_INGREDIENT',
    REMOVE = 'REMOVE_INGREDIENT'
}

interface IngredientActionType<T, P> {
    [x: string]: any;
    type: T,
    payload: P
}

export type IngredientAction = 
    | IngredientActionType<typeof IngredientActions.ADD, Ingredient>
    | IngredientActionType<typeof IngredientActions.REMOVE, Ingredient>