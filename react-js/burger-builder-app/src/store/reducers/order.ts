import * as actionTypes from '../actions/actionTypes';
import { OrderingData } from '../../models/Order';

const initialState: actionTypes.Order = {
    orders: [],
    loading: true,
    purchased: false
}

const reducer = (state: actionTypes.Order = initialState, action: actionTypes.OrderActions & actionTypes.OrdersActions) => {
    switch (action.type) {
        case actionTypes.OrderAction.PUCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.OrderAction.PURCHASE_START:
            // NOTE : On PURCHASE_START action set loading = true
            return {
                ...state,
                loading: true
            }
        case actionTypes.OrderAction.PURCHASE_SUCCESS:
            // Recieve order data from action creator
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder) // Add as immutability array
            };
        case actionTypes.OrderAction.PURCHASE_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.OrdersAction.FETCH_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.OrdersAction.FETCH_SUCCESS:
            return {
                ...state,
                orders: action.orders as OrderingData[],
                loading: false
            };
        case actionTypes.OrdersAction.FETCH_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;