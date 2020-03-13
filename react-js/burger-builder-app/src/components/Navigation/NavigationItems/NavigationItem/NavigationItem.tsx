import React from 'react'
import classes from './NavigationItem.module.css'

type NavigationItemProp = {
    link: string;
    active: boolean;
    children: React.ReactNode;
}

const NavigationItem = (props: NavigationItemProp) => {
    return (
        <li className={classes.NavigationItem}>
            <a href={props.link} className={props.active ? classes.active : undefined}>
                {props.children}
            </a>
        </li>
    )
}

export default NavigationItem
