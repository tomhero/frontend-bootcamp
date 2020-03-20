import * as actionTypes from './actionTypes';
import { OrderableIngredients } from '../../models/Burger';
import axios from '../../axios-order';

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

export const setIngredients = (ingredients: OrderableIngredients) => {
    return {
        type: actionTypes.IngredientActions.SET,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.IngredientActions.FETCH_FAILED
    }
}

export const initIngredients = () => {
    return (dispatch: Function) => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data as unknown as OrderableIngredients))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            });
    }
}
