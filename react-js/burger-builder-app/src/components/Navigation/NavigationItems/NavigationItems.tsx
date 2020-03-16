import React from 'react'
import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props: any) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem exact={true} link="/" active={true}>Burger Builder</NavigationItem>
            <NavigationItem exact={false} link="/orders" active={false}>Orders</NavigationItem>
        </ul>
    )
}

export default NavigationItems
