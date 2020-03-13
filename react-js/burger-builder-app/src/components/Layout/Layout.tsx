import React, { Component } from "react";

import classes from './Layout.module.css';

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from '../Navigation/Sidedrawer/SideDrawer';

type LayoutProp = {};

class Layout<LayoutProp> extends Component {

    state = {
        showSideDrawer: true
    }

    setDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    render() {
        return (
            // Just like a React.Fragment below
            <>
                <Toolbar />
                <SideDrawer open={this.state.showSideDrawer} closed={this.setDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
            );
    }
}

export default Layout;