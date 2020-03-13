import React, { Component } from 'react'
import { OrderableIngredients } from '../../../models/Burger'
import Button from '../../UI/Button/Button';

type OrderSummaryProp = {
    title?: string;
    description?: string;
    ingredients: OrderableIngredients;
    purchaseContinued: (ev: React.MouseEvent) => void;
    purchaseCanceled: (ev: React.MouseEvent) => void;
    price: number;
}

class OrderSummary extends Component<OrderSummaryProp, {}> {
    // NOTE : This could be a FC, dosen't have to be class component
    
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingredientName => {
                return <li key={ingredientName}>
                    <span style={{ textTransform: 'capitalize' }}>{ingredientName}</span> : {this.props.ingredients[ingredientName]}
                </li>
            });
        return (
            <>
                <h3>{this.props.title || 'Your Orders'}</h3>
                <p>{this.props.description || 'A delicious burger with the following ingredients '}</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: </strong><u>{this.props.price}</u> ฿</p>
                <p>Continue to checkout?</p>
                <Button buttonType="Danger" clicked={this.props.purchaseCanceled}>
                    <span>Cancel</span>
                </Button>
                <Button buttonType="Success" clicked={this.props.purchaseContinued}>
                    <span>Ok</span>
                </Button>
            </>
        )
    }
}

export default OrderSummary
