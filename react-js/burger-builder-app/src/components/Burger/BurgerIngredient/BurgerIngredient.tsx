import React from "react";
import classes from './BurgerIngredient.module.css'

import { Ingredient } from "../../../models/Burger";

type IngredientProp= {
    /** The type of ingredient */
    type: string;
}

function BurgerIngredient(props: IngredientProp): JSX.Element {
    let ingredient = <i>Not a valid ingredient!!</i>;

    switch (props.type.toLowerCase()) {
        case Ingredient.BreadBottom:
            ingredient = <div className={classes.BreadBottom}></div>
            break;
        case Ingredient.BreadTop:
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case Ingredient.Meat:
            ingredient = <div className={classes.Meat}></div>
            break;
        case Ingredient.Cheese:
            ingredient = <div className={classes.Cheese}></div>
            break;
        case Ingredient.Salad:
            ingredient = <div className={classes.Salad}></div>
            break;
        case Ingredient.Bacon:
            ingredient = <div className={classes.Bacon}></div>
            break;
    }

    return ingredient;
}

export default BurgerIngredient;