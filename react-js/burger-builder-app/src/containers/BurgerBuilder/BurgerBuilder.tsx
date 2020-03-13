import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import { BurgerBuilderState } from '../../models/Burger';

class BurgerBuilder extends Component {

    state: BurgerBuilderState = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    render () {
        return (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls />
            </>
        );
    }
}

export default BurgerBuilder;