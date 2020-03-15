import React, { Component } from "react";
import { OrderableIngredients } from '../../models/Burger';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { RouteComponentProps } from "react-router-dom";

type CheckoutState = {
    ingredients: OrderableIngredients
}

class Checkout extends Component<RouteComponentProps> {

    state: CheckoutState = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        // Go to '/checkout/contact-data'
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutContinued={() => this.checkoutContinuedHandler()}
                    checkoutCanceled={() => this.checkoutCanceledHandler()}
                    />
            </div>
        );
    }
}

export default Checkout;