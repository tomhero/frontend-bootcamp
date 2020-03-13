import React from 'react'
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
            <p><strong>Total Price: </strong><u>{props.price}</u> ฿</p>
            <p>Continue to checkout?</p>
            <Button buttonType="Danger" clicked={props.purchaseCanceled}>
                <span>Cancel</span>
            </Button>
            <Button buttonType="Success" clicked={props.purchaseContinued}>
                <span>Ok</span>
            </Button>
        </>
    )
}

export default OrderSummary
