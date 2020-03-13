import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import { BurgerBuilderState, Ingredient } from '../../models/Burger';

const INGREDIENT_PRICE: {
    [salad: string]: number,
    cheese: number,
    meat: number,
    bacon: number
} = {
    salad: 10,
    cheese: 5,
    meat: 30,
    bacon: 10
}

class BurgerBuilder extends Component {

    state: BurgerBuilderState = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0
    }

    addIngredientHandler = (type: Ingredient) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted;

        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    }

    removeIngredientHandler = (type: Ingredient) => {
    }

    render() {
        return (
            <>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler}/>
            </>
        );
    }
}

export default BurgerBuilder;