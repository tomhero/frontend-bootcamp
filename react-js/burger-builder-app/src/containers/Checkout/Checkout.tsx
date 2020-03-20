import React, { Component } from "react";
import { OrderableIngredients } from '../../models/Burger';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { RouteComponentProps, Redirect } from "react-router-dom";
import { Route } from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";

type CheckoutState = {
    ingredients: OrderableIngredients;
    totalPrice: number;
}

class Checkout extends Component<RouteComponentProps & PropsFromRedux, CheckoutState> {

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
            if (key === 'price') {
                totalPrice += (+val as number);
            } else {
                ingredients[key] = +val as number;
            }
        });
        this.setState({ ingredients: ingredients, totalPrice: totalPrice });
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
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            summary = <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCanceled={this.checkoutCanceledHandler}
                />
                <Route
                    path={`${this.props.match.path}/contact-data`}
                    // NOTE : passing props (binding...)
                    component={ContactData}
                />
            </div>
        }
        return summary;
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        ings: state.burgerBuilder.ingredients
    }
}

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Checkout);