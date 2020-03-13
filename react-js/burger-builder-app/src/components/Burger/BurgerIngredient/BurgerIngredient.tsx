import React from "react";
import classes from './BurgerIngredient.module.css'

enum Ingredient {
    BredBottom= "bred-bottom",
    BreadTop = "bread-top",
    Meat = "meat",
    Cheese = "chesse",
    Salad = "salad",
    Bacon = "bacon"
}

type IngredientProp= {
    /** The type of ingredient */
    type: string;
}

function BurgerIngredient(props: IngredientProp) {
    let ingredient = null;

    switch (props.type.toLowerCase()) {
        case Ingredient.BredBottom:
            ingredient = <div className={classes.BredBottom}></div>
            break;
        case Ingredient.BreadTop:
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seed1}></div>
                    <div className={classes.Seed2}></div>
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