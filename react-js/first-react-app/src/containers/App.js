import React from 'react';
import './App.css';
import footerStyle from './Footer.module.css'
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends React.Component {

  state = {
    persons: [
      { id: Math.random().toString(), name: 'Tom', age: 23 },
      { id: Math.random().toString(), name: 'Que', age: 29 },
      { id: Math.random().toString(), name: 'Art', age: 30 }
    ],
    showPerson: true,
    otherState: 'some others state!!?'
  }

  // In a class component you need to use arrow function as a handler
  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 23 },
        { name: 'Que', age: 29 },
        { name: 'Art', age: 30 }
      ]
    })
  }

  nameChangedHandler = (target, id) => {
    const personIndex = this.state.persons.findIndex(person => person.id === id);
    // Clonning is very impoertant!!
    const person = { ...this.state.persons[personIndex] };

    person.name = target.value;

    // Clonning is very impoertant!!
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
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

    let personList = <br />;
    // conditional rendering with JS way!!
    if (this.state.showPerson) {
      personList =
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />
    }

    return (
      // StyleRoot use with radium with @media query
      <div className="App">
        <header className="App-header">
          <Cockpit showPerson={this.state.showPerson}
            persons={this.state.persons}
            click={this.toggleHandler.bind(this)}></Cockpit>
          {personList}
          <i className={footerStyle.upper}>{this.state.otherState}</i>
        </header>
      </div>
    );
  }
}

// Radium is a high order component!!
export default App;
