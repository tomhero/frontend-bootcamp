import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
import { OrderingData } from '../../models/Order';

export const purchaseBurgerSuccess = (id: string, orderData: OrderingData) => {
    return {
        type: actionTypes.OrderAction.PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error: any) => {
    return {
        type: actionTypes.OrderAction.PURCHASE_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.OrderAction.PURCHASE_START
    }
}

export const purchaseBurger = (orderData: OrderingData) => {
    // Redux thunk middleware --> dispatch
    return (dispatch: Function) => {
        // NOTE : Before send request --> dispatch purchaseBurger action for start loading state
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
            .then(response => {
                // When success call dispatch success
                // data.name from firebase
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                // When fail call dispatch failed
                dispatch(purchaseBurgerFail(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.OrderAction.PUCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders: OrderingData[]) => {
    return {
        type: actionTypes.OrdersAction.FETCH_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error: any) => {
    return {
        type: actionTypes.OrdersAction.FETCH_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.OrdersAction.FETCH_START
    }
}

export const fetchOrders = () => {
    return (dispatch: Function) => {
        // To make spinner showing on screen
        // NOTE : Don't forget to call ot with dispatch()
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
            .then(response => {
                // NOTE : Mapping data into a valid form
                const fetchedOrders: OrderingData[] = Object.keys(response.data)
                    .map(orderKey => {
                        return {
                            id: orderKey,
                            ...response.data[orderKey]
                        };
                    })
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    }
}