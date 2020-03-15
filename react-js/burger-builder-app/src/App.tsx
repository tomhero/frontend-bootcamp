import React, { Component } from 'react';

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";

class App extends Component {

  state = {
    show: true
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({show: false});
  //     // NOTE : To test componentWillUnmount
  //   }, 1500);
  // }

  render() {
    return (
      <div className="App">
        <Layout>
          {this.state.show ? <BurgerBuilder /> : null}
          <Checkout />
        </Layout>
      </div>
    );
  }

}

export default App;
