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
    showPerson: true,
    otherState: 'some others state!!?'
  }

  // In a class component ou need to use arrow function as a handler
  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 23 },
        { name: 'Que', age: 29 },
        { name: 'Art', age: 30 }
      ]
    })
  }

  deletePersonHandler = (pIndex) => {
    // Just clone it before di sonething with your state
    let newPersons = [...this.state.persons];
    newPersons.splice(pIndex, 1);
    this.setState({
      persons: newPersons
    });
    console.log(newPersons);
  }

  toggleHandler = () => {
    console.log('Toggling...');
    this.setState({
      showPerson: !this.state.showPerson
    });
  }

  render() {
    const style = {
      backgroundColor: 'white',
      border: '1px solid blue',
      padding: '4px',
      cursor: 'pointer'
    };

    let personList = <br />;
    // conditional rendering with JS way!!
    if (this.state.showPerson) {
      personList = (
        <div>
          {this.state.persons.map((person, index) => {
            // key={index} <-- this is nessessary.
            return <Person
              click={this.deletePersonHandler.bind(this, index)}
              name={person.name}
              age={person.age}
              key={index} />
          })}
        </div>
      )
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          <button style={style} onClick={
            this.toggleHandler.bind(this)
          }>
            Click for Toggle
          </button>
          {personList}
          <i>{this.state.otherState}</i>
        </header>
      </div>
    );
  }
}

export default App;
