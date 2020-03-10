import React from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person'

class App extends React.Component {

 state = {
   persons: [
     { name: 'Tom', age: 23 },
     { name: 'Que', age: 29 },
     { name: 'Art', age: 30 }
   ],
   otherState: 'some others state!!?'
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 23 },
        { name: 'Que', age: 29 },
        { name: 'Art', age: 30 }
      ]
    })
  }

  render () {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <br></br>
          <button style={style} onClick={
            () => this.switchNameHandler(this.state.persons[0].name.toUpperCase())
            }>
            Click for UPPER
          </button>
          <br />
          <button style={style} onClick={
            this.switchNameHandler.bind(this, this.state.persons[0].name.toLowerCase())
            }>
            Click for lower
          </button>
          <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age} ></Person>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age} >This is Chlidren</Person>
          <i>{this.state.otherState}</i>
        </header>
      </div>
    );
  }
}

export default App;
