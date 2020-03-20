import { OrderableIngredients } from "../../models/Burger";
import { OrderingData } from "../../models/Order";

/**
 * Burger Action types
 */
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

/**
 * Order Action types
 */

 export enum OrderAction {
     PURCHASE_SUCCESS,
     PURCHASE_FAIL
 }

 interface OrderActionType<T, P> {
    [x: string]: any;
    type: T,
    payload: P
}

export type OrderActions = 
    | OrderActionType<typeof OrderAction.PURCHASE_SUCCESS, OrderingData>
    | OrderActionType<typeof OrderAction.PURCHASE_FAIL, OrderingData>

