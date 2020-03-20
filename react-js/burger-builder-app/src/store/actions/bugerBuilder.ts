import * as actionTypes from './actionTypes';

// This action creator
export const addIngredient = (name: string) => {
    return {
        type: actionTypes.IngredientActions.ADD,
        ingredientName: name
    }
}

export const removeIngredient = (name: string) => {
    return {
        type: actionTypes.IngredientActions.REMOVE,
        ingredientName: name
    }
}
