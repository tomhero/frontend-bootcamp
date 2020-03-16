import React, { Component } from 'react';

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders'
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          {/* NOTE : You can see BrowserRouter in index.jsx file */}
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="orders" component={Orders}/>
            <Route path="/"exact={true}  component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
