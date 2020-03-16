import React, { Component } from "react";
import { OrderableIngredients } from '../../models/Burger';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { RouteComponentProps } from "react-router-dom";
import { Route } from 'react-router-dom';
import ContactData from "./ContactData/ContactData";

type CheckoutState = {
    ingredients: OrderableIngredients;
    totalPrice: number;
}

class Checkout extends Component<RouteComponentProps> {

    state: CheckoutState = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 0
    }

    componentDidMount() {
        let query = new URLSearchParams(this.props.location.search);
        const ingredients: any = {};
        let totalPrice = 0;
        query.forEach((val, key) => {
            // key = bacon , val = '0'
            ingredients[key] = +val as number;
            if (key === 'price') {
                totalPrice += ingredients[key];
            }
        });
        this.setState({ingredients: ingredients, totalPrice: totalPrice});
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
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    />
                <Route 
                    path={`${this.props.match.path}/contact-data`} 
                    // NOTE : passing props (binding...)
                    render={
                        (props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />
                    } 
                />
            </div>
        );
    }
}

export default Checkout;