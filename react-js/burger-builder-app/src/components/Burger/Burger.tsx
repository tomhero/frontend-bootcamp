import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import { OrderableIngredients } from "../../models/Burger";

type BurgerProp = {
    ingredients: OrderableIngredients;
}

const Burger: React.FC<any> = (props: BurgerProp) => {
    // NOTE : JSX.Element[] | JSX.Element can be useful here
    let trasformedIngredients: JSX.Element[] | JSX.Element = Object.keys(props.ingredients)
        .map(ingredientName => [...Array(props.ingredients[ingredientName])]
            .map((_, index) => <BurgerIngredient key={ingredientName + index} type={ingredientName} />))
        .reduce((prev, current) => {
            return prev.concat(current);
        }, []);
        if (trasformedIngredients.length === 0) {
            trasformedIngredients = <p>Please adding ingredient first!</p>
        }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {trasformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;