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
            {
                controls.map(ctrl => (
                    <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label}
                        added={() => props.ingredientAdded(ctrl.type)} />
                ))
            }
        </div>
    );
}

export default BuildControls;