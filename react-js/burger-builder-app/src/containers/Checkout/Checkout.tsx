import React, { Component } from "react";
import { OrderableIngredients } from '../../models/Burger';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

type CheckoutState = {
    ingredients: OrderableIngredients
}

class Checkout extends Component {

    state: CheckoutState = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        );
    }
}

export default Checkout;