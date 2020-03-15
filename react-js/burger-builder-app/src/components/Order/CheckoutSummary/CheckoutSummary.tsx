import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from './CheckoutSummary.module.css';
import { OrderableIngredients } from "../../../models/Burger";

type CheckoutSummaryProp = {
    ingredients: OrderableIngredients;
    checkoutCanceled: () => void;
    checkoutContinued: () => void;
}

const CheckoutSummary = (props: CheckoutSummaryProp) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Checkout Summary!!</h1>
            <div style={{width: '100%', height: '300px', margin: 'autp'}}>
                <Burger ingredients={props.ingredients} />
                <Button buttonType={"Danger"} clicked={props.checkoutCanceled}>CANCEL</Button>
                <Button buttonType={"Success"} clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    );
}

export default CheckoutSummary;