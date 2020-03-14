import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/Ordersummary/Ordersummary';
import axios from '../../axios-order';

import { BurgerBuilderState, Ingredient, OrderableIngredients } from '../../models/Burger';

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
        totalPrice: 0,
        pusrchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients: OrderableIngredients) {
        const sum = Object.keys(ingredients)
            .map(integredientName => {
                return ingredients[integredientName] as number;
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ pusrchasable: sum > 0 })
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

        // NOTE : You must passing a new state to anothor function that use the updated state
        this.updatePurchaseState(updatedIngredients);
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

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert('purchaseContinueHandler');
        // Send data to backend
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Chayut Ruksonya',
                address: {
                    street: 'TestStreet 101',
                    zipCode: '10260',
                    country: 'Thailand'
                },
                email: 'mymail@test.com'
            },
            deliveryMethod: 'Jet'
        }
        axios.post('/orders.json', order)
            .then(response => response)
            .catch(error => error);
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
                <Modal isShowing={this.state.purchasing}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseContinued={this.purchaseContinueHandler}
                        purchaseCanceled={this.purchaseCancelHandler}
                        price={this.state.totalPrice} />
                </Modal>
                <div style={{ filter: (this.state.purchasing ? 'blur(2rem)' : 'none') }}>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.pusrchasable}
                        ordered={this.purchaseHandler} />
                </div>
            </>
        );
    }
}

export default BurgerBuilder;