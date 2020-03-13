import React from 'react'
import { OrderableIngredients } from '../../../models/Burger'

type OrderSummaryProp = {
    title?: string;
    description?: string;
    ingredients: OrderableIngredients;
}

const OrderSummary: React.FC<OrderSummaryProp> = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredientName => {
            return <li>
                    <span style={{ textTransform: 'capitalize' }}>{ingredientName}</span> : {props.ingredients[ingredientName]}
                </li>
        });
    return (
        <>
            <h3>Your Orders {props.title}</h3>
            <p>A delicious burger with the following ingredients {props.description}</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </>
    )
}

export default OrderSummary
