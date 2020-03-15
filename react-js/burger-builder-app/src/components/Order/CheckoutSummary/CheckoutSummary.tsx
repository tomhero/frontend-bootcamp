import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props: any) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Checkout Summary!!</h1>
            <div style={{width: '100%', height: '300px', margin: 'autp'}}>
                <Burger ingredients={props.ingredients} />
                <Button buttonType={"Danger"} clicked={() => () => {}}>CANCEL</Button>
                <Button buttonType={"Success"} clicked={() => () => {}}>CONTINUE</Button>
            </div>
        </div>
    );
}

export default CheckoutSummary;