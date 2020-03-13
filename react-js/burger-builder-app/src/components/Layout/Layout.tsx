import React from "react";

import classes from './Layout.module.css';

import Toolbar from "../Navigation/Toolbar/Toolbar";

type LayoutProps = any;

const Layout: React.FC = (props: LayoutProps) => {
    return (
    // Just like a React.Fragment below
    <>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </>
    );
}

export default Layout;