import * as actionTypes from '../actions/actionTypes';

const initialState: actionTypes.Order = {
    orders: [],
    loading: false
}

const reducer = (state: actionTypes.Order = initialState, action: actionTypes.OrderActions) => {
    switch (action.type) {
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
                orders: state.orders.concat(newOrder) // Add as immutability array
            };
        case actionTypes.OrderAction.PURCHASE_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;