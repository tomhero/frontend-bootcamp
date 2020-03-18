import { Ingredient, IngredientActions, IngredientAction } from './actions';

const initialState: Ingredient = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}

const reducer = (state = initialState, action: IngredientAction) => {
    switch (action.type) {
        case IngredientActions.ADD:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: (state.ingredients[action.ingredientName] as number) + 1
                }
            }
        case IngredientActions.REMOVE:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: (state.ingredients[action.ingredientName] as number) - 1
                }
            }
        default:
            return state;
    }
}

export default reducer;