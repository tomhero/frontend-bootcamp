import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import { BurgerBuilderState, Ingredient } from '../../models/Burger';

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
        const oldCount = this.state.ingredients[type] as number;
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted;

        const priceAddition = INGREDIENT_PRICE[type] as number;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    }

    removeIngredientHandler = (type: Ingredient) => {
        const oldCount = this.state.ingredients[type] as number;
        if (oldCount <= 0) {
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted;

        const priceAddition = INGREDIENT_PRICE[type] as number;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            // Disable Less button if ingredient reach zero value
            disabledInfo[key] = disabledInfo[key] <= 0 as boolean;
        }
        return (
            <>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}/>
            </>
        );
    }
}

export default BurgerBuilder;