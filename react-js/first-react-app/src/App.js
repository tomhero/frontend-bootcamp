import React from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person'

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

  nameChangedHandler = (target, id) => {
    const personIndex = this.state.persons.findIndex(person => person.id === id);
    // Clonning is very impoertant!!
    const person = {...this.state.persons[personIndex]};

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
    const style = {
      // This JS with css code can not use :psudo feature of css
      backgroundColor: 'lightgreen',
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
              change={({target}) => this.nameChangedHandler(target, person.id)}
              name={person.name}
              age={person.age}
              key={person.id} />
          })}
        </div>
      )
      style.backgroundColor = 'pink';
    }

    // let classes = ['red', 'bold'].join(' '); // --> "red bold"
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red') // class = ['red']
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold') // class = ['red', 'bold']
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className={classes.join(' ')}> This is really working </p>
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
