import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id: string, orderData: any) => {
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

export const purchaseBurgerStart = (orderData: any) => {
    // Redux thunk middleware --> dispatch
    return (dispatch: Function) => {
        axios.post('/orders.json', orderData)
            .then(response => {
                // When success call dispatch success
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            })
            .catch(error => {
                // When fail call dispatch failed
                dispatch(purchaseBurgerFail(error))
            })
    }
}