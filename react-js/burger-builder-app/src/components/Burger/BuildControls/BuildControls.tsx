import React from 'react';
import { BurgerControls, Ingredient, BuildControlsProp } from '../../../models/Burger'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls: BurgerControls = [
    { label: 'Salad', type: Ingredient.Salad },
    { label: 'Bacon', type: Ingredient.Bacon },
    { label: 'Cheese', type: Ingredient.Cheese },
    { label: 'Meat', type: Ingredient.Meat }
]

const BuildControls = (props: BuildControlsProp) => {
    return (
        <div className={classes.BuildControls}>
            <p> Price : {props.price} </p>
            {
                controls.map(ctrl => (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        added={() => props.ingredientAdded(ctrl.type)}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                        disabled={props.disabled[ctrl.type] as boolean} />
                ))
            }
            <button 
                className={classes.OrderButton} 
                style={{ textTransform: 'uppercase' }}
                disabled={!props.purchasable}
                >
                Order Now
                </button>
        </div>
    );
}

export default BuildControls;