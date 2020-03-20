import burgerBuilderReducer from './reducers/burgerBuilder';
import orderReducer from './reducers/order';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
});

export type RootState = ReturnType<typeof rootReducer>