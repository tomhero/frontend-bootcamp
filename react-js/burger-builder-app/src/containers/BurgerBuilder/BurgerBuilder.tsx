import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/Ordersummary/Ordersummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import { RouteComponentProps } from "react-router-dom";

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

// If you nedd to use props from router object --> `RouteComponentProps`
class BurgerBuilder extends Component<RouteComponentProps> {

    state: BurgerBuilderState = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        pusrchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => this.setState({ error: true }))
            .finally(() => {
                this.setState({ loading: false });
            });
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
        const queryParams: string[] = [];
        for (const key in this.state.ingredients) {
            queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.state.ingredients[key]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            // Disable Less button if ingredient reach zero value
            disabledInfo[key] = disabledInfo[key] <= 0 as boolean;
        }
        let orderSummary: any = <Spinner />
        let burger: any = <Spinner />
        if (!this.state.loading) {
            if (this.state.error) {
                burger = <p> Burger cannot be loaded!! </p>
                orderSummary = null
            } else {
                burger = (
                    <>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchasable={this.state.pusrchasable}
                            ordered={this.purchaseHandler} />
                    </>);

            }
            orderSummary = (<OrderSummary
                ingredients={this.state.ingredients}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCanceled={this.purchaseCancelHandler}
                price={this.state.totalPrice} />);
        }
        return (
            <>
                <Modal isShowing={this.state.purchasing} modalClosed={() => () => { }}>
                    {orderSummary}
                </Modal>
                <div style={{ filter: (this.state.purchasing ? 'blur(2rem)' : 'none') }}>
                    {burger}
                </div>
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);