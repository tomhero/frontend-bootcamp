import React from "react";

import classes from './Layout.module.css';

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from '../Navigation/Sidedrawer/SideDrawer';

type LayoutProps = any;

const Layout: React.FC = (props: LayoutProps) => {
    return (
    // Just like a React.Fragment below
    <>
        <Toolbar />
        <SideDrawer />
        <main className={classes.Content}>
            {props.children}
        </main>
    </>
    );
}

export default Layout;