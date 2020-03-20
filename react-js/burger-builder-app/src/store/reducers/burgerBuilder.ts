import { Ingredient, IngredientActions, IngredientAction } from '../actions/actionTypes';
import { OrderableIngredients } from '../../models/Burger';

const INGREDIENT_PRICE: {
    [salad: string]: number | boolean,
    cheese: number | boolean,
    meat: number | boolean,
    bacon: number | boolean
} = {
    salad: 6.75,
    cheese: 4.25,
    meat: 30.50,
    bacon: 10.75
}

const initialState: Ingredient = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
    error: false,
    loadingIngredients: true
}

const reducer = (state = initialState, action: IngredientAction): Ingredient => {
    switch (action.type) {
        case IngredientActions.ADD:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: (state.ingredients[action.ingredientName] as number) + 1
                },
                totalPrice: state.totalPrice + (INGREDIENT_PRICE[action.ingredientName] as number)
            }
        case IngredientActions.REMOVE:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: (state.ingredients[action.ingredientName] as number) - 1
                },
                totalPrice: state.totalPrice - (INGREDIENT_PRICE[action.ingredientName] as number)
            }
        case IngredientActions.SET:
            return {
                ...state,
                ingredients: action.ingredients as OrderableIngredients,
                error: false,
                loadingIngredients: false
            }
        case IngredientActions.FETCH_FAILED:
            return {
                ...state,
                loadingIngredients: false,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;