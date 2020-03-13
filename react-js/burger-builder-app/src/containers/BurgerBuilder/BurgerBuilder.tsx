import React, { Component } from "react";
import Burger from '../../components/Burger/Burger';

import { BurgerBuilderState } from '../../models/Burger';

class BurgerBuilder extends Component {

    state: BurgerBuilderState = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        }
    }

    render () {
        return (
            <>
                <Burger ingredients={this.state.ingredients}/>
                <div>Builder Controller</div>
            </>
        );
    }
}

export default BurgerBuilder;