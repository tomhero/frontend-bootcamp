import React, { Component } from "react";
import { OrderableIngredients } from '../../models/Burger';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { RouteComponentProps } from "react-router-dom";
import { Route } from 'react-router-dom';
import ContactData from "./ContactData/ContactData";

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

    componentDidMount() {
        let query = new URLSearchParams(this.props.location.search);
        const ingredients: any = {};
        query.forEach((val, key) => {
            // key = bacon , val = '0'
            ingredients[key] = +val as number;
        });
        this.setState({ingredients: ingredients});
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        // Go to '/checkout/contact-data'
        console.log(this.props.match.path);
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
                <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
            </div>
        );
    }
}

export default Checkout;