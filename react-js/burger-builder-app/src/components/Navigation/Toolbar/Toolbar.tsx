import React from 'react';
import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';

import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props: any) => {
    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
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
