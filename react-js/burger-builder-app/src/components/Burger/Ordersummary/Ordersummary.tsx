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
            return <li key={ingredientName}>
                    <span style={{ textTransform: 'capitalize' }}>{ingredientName}</span> : {props.ingredients[ingredientName]}
                </li>
        });
    return (
        <>
            <h3>{props.title ||  'Your Orders'}</h3>
            <p>{props.description || 'A delicious burger with the following ingredients '}</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </>
    )
}

export default OrderSummary
