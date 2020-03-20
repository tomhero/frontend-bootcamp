import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/Ordersummary/Ordersummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import { RouteComponentProps } from "react-router-dom";

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/index";
import * as bugerBuilderActions from '../../store/actions/index';

import { BurgerBuilderState, OrderableIngredients } from '../../models/Burger';

// If you nedd to use props from router object --> `RouteComponentProps`
class BurgerBuilder extends Component<RouteComponentProps & PropsFromRedux, BurgerBuilderState> {

    state: BurgerBuilderState = {
        pusrchasable: false,
        purchasing: false
    }

    componentDidMount() {
        // Call of ingredients here to redux store
        this.props.onInitIngredients()
    }

    updatePurchaseState(ingredients: OrderableIngredients) {
        const sum = Object.keys(ingredients)
            .map(integredientName => {
                return ingredients[integredientName] as number;
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
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
        for (const key in this.props.ings) {
            queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.props.ings[key]));
        }
        queryParams.push('price=' + this.props.price);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            // Disable Less button if ingredient reach zero value
            disabledInfo[key] = disabledInfo[key] <= 0 as boolean;
        }
        let orderSummary: any = <Spinner />
        let burger: any = <Spinner />
        if (!this.props.loading) {
            if (this.props.error) {
                burger = <p> Burger cannot be loaded!! </p>
                orderSummary = null
            } else {
                burger = (
                    <>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler} />
                    </>);

            }
            orderSummary = (<OrderSummary
                ingredients={this.props.ings}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCanceled={this.purchaseCancelHandler}
                price={this.props.price} />);
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

const mapStateToProps = (state: RootState) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        loading: state.burgerBuilder.loadingIngredients
    }
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        onIngredientAdded: (ingName: string) => dispatch(bugerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName: string) => dispatch(bugerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(bugerBuilderActions.initIngredients())
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

// NOTE: Generate props type for redux that can be used in this component
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(withErrorHandler(BurgerBuilder, axios));