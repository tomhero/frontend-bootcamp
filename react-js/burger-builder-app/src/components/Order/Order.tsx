import React from 'react';
import classes from './Order.module.css'

const Order = (props: any) => (
    <div className={classes.Order}>
        <p>Ingredient: Salad (1)</p>
        <p>Price: <u>123.235 ฿</u></p>
    </div>
);

export default Order;