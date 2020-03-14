import React from 'react';
import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../Sidedrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props: {drawToggleClicked: (ev: React.MouseEvent) => void}) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawToggleClicked} />
            {/* NOTE : classes.Logo is hacking!! */}
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar
