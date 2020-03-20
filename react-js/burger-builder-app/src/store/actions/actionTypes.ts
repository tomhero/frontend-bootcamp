import { OrderableIngredients } from "../../models/Burger";

export interface Ingredient {
    ingredients: OrderableIngredients;
    totalPrice: number;
    error: boolean;
    loadingIngredients: boolean; 
}
 
export enum IngredientActions {
    ADD = 'ADD_INGREDIENT',
    REMOVE = 'REMOVE_INGREDIENT',
    SET = "SET_INGREDIENTS",
    FETCH_FAILED = "FETCH_INGREDIENTS_FAILED"
}

interface IngredientActionType<T, P> {
    [x: string]: any;
    type: T,
    payload: P
}

export type IngredientAction = 
    | IngredientActionType<typeof IngredientActions.ADD, Ingredient>
    | IngredientActionType<typeof IngredientActions.REMOVE, Ingredient>
    | IngredientActionType<typeof IngredientActions.SET, OrderableIngredients>
    | IngredientActionType<typeof IngredientActions.FETCH_FAILED, OrderableIngredients>