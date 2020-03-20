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

export interface Order {
    orders: OrderingData[];
    loading: boolean;
}

 export enum OrderAction {
     PURCHASE_SUCCESS = "PURCHASE_ORDER_SUCCESS",
     PURCHASE_FAIL = "PURCHASE_ORDER_FAILED",
     PURCHASE_START = "PURCHASE_ORDER_START"
 }

 interface OrderActionType<T, P> {
    [x: string]: any;
    type: T,
    payload: P
}

export type OrderActions = 
    | OrderActionType<typeof OrderAction.PURCHASE_SUCCESS, Order>
    | OrderActionType<typeof OrderAction.PURCHASE_FAIL, Order>
    | OrderActionType<typeof OrderAction.PURCHASE_START, Order>

