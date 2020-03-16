import React from 'react'
import { NavLink } from "react-router-dom";
import classes from './NavigationItem.module.css'

type NavigationItemProp = {
    link: string;
    active: boolean;
    children: React.ReactNode;
    exact: boolean;
}

const NavigationItem = (props: NavigationItemProp) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink exact={props.exact} to={props.link} activeClassName={classes.active}>
                {props.children}
            </NavLink>
        </li>
    )
}

export default NavigationItem
