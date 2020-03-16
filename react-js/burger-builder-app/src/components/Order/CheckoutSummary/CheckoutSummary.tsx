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
            <div style={{width: '100%', height: '364px', margin: '0 auto'}}>
                <Burger ingredients={props.ingredients} />
                <Button buttonType={"Success"} clicked={props.checkoutContinued}>CONTINUE</Button>
                <Button buttonType={"Danger"} clicked={props.checkoutCanceled}>CANCEL</Button>
            </div>
        </div>
    );
}

export default CheckoutSummary;