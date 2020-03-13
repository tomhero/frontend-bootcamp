import React from "react";

import classes from './Layout.module.css';

type LayoutProps = any;

const Layout: React.FC = (props: LayoutProps) => {
    return (
    // Just like a React.Fragment below
    <>
        <div>Toolbar, Sidedrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </>
    );
}

export default Layout;