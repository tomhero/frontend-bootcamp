import React from 'react';
import classes from './Order.module.css'
import { OrderableIngredients } from '../../models/Burger';

type OrderProp = {
    ingredients: OrderableIngredients;
    price: number;
}

const Order = (props: OrderProp) => {
    const ingredients: {name: string; amount: number}[] = [];
    Object.keys(props.ingredients)
        .forEach(ingredientName => {
            ingredients.push({
                name: ingredientName,
                amount: props.ingredients[ingredientName] as number
            });
        });
    let ingredientOutput = ingredients.map(ingredient => {
        return <span  
            style={{textTransform: 'capitalize', 
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'}}
            key={ingredient.name}>
                {ingredient.name} ({ingredient.amount}) 
            </span>
    });
    return (
        <div className={classes.Order}>
            <p>Ingredient: {ingredientOutput}</p>
            <p>Price: <u>{props.price}</u> ฿</p>
        </div>
    )
};

export default Order;