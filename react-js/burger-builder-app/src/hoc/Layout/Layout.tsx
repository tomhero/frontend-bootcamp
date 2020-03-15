import React, { Component } from "react";

import classes from './Layout.module.css';

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

type LayoutProp = {
    children: React.ReactNode;
};

type LayoutState = {
    showSideDrawer: boolean;
}

class Layout extends Component<LayoutProp, LayoutState> {

    state = {
        showSideDrawer: false
    }

    setDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        });
    }

    render() {
        return (
            // Just like a React.Fragment below
            <>
                <Toolbar drawToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.setDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
            );
    }
}

export default Layout;