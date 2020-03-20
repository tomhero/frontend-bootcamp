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
    purchased: boolean;
}

 export enum OrderAction {
     PURCHASE_SUCCESS = "PURCHASE_ORDER_SUCCESS",
     PURCHASE_FAIL = "PURCHASE_ORDER_FAILED",
     PUCHASE_INIT = "INITIAL_ORDER_PURCHASE",
     PURCHASE_START = "PURCHASE_ORDER_START",
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
    | OrderActionType<typeof OrderAction.PUCHASE_INIT, Order>

/**
 * Retrive Orders Action types
 */

export enum OrdersAction {
    FETCH_START =  "FETCH_ORDERS_START",
    FETCH_SUCCESS =  "FETCH_ORDERS_SUCCESS",
    FETCH_FAIL =  "FETCH_ORDERS_START"
}

interface OrdersActionType<T, P> {
    [x: string]: any;
    type: T,
    payload: P
}

export type OrdersActions = 
    | OrdersActionType<typeof OrdersAction.FETCH_START, OrderingData[]>
    | OrdersActionType<typeof OrdersAction.FETCH_SUCCESS, OrderingData[]>
    | OrdersActionType<typeof OrdersAction.FETCH_FAIL, OrderingData[]>