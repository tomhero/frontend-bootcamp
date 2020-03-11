import React from 'react';
import './App.css';
import footerStyle from './Footer.module.css'
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from "../hoc/withClass";
import Aux from '../hoc/Auxiliary';

class App extends React.Component {

  // 1st lifecycle call
  constructor(props) {
    super(props);
    // if you want to set dome initial state based on props, Do it here¡!
    console.log('constructure');
  }

  state = {
    persons: [
      { id: Math.random().toString(), name: 'Tom', age: 23 },
      { id: Math.random().toString(), name: 'Que', age: 29 },
      { id: Math.random().toString(), name: 'Art', age: 30 }
    ],
    showPerson: false,
    showCockpit: true,
    otherState: 'some others state!!?',
    changeCounter: 0 // For tracking purpose
  }

  // 2nd lifecycle call
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps', props);
    return state;
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

    this.setState((prevState, props) => {
      // Update state base on previous state
      // NOTE : best practice
        return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
    })
  }

  deletePersonHandler = (pIndex) => {
    // Just clone it before di sonething with your state
    let newPersons = [...this.state.persons];
    newPersons.splice(pIndex, 1);
    this.setState({
      persons: newPersons
    });
  }

  toggleHandler = () => {
    this.setState({
      showPerson: !this.state.showPerson
    });
  }

  // 3rd lifecycle call
  render() {
    console.log('render...')
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
      <Aux>
        <button onClick={() => this.setState({ showCockpit: !this.state.showCockpit })}> Toggle Cockpit </button>
        {this.state.showCockpit ? <Cockpit showPerson={this.state.showPerson}
          personsLength={this.state.persons.length}
          click={this.toggleHandler.bind(this)}
          title={this.props.appTitle}></Cockpit> : null
        }
        {personList}
        <i className={footerStyle.upper}>{this.state.otherState}</i>
      </Aux>
    );
  }

  // 4th lifecycle call
  componentDidMount() {
    // do async task...
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // This cycle is very important
    console.log('shouldComponentUpdate');
    // Allow to update with `retrun true`
    return true;
  }

  componentDidUpdate() {
    // do async task...
    console.log('componentDidUpdate');
  }

}

// withClass is a (custom) high order component!!
export default withClass(App, "App");
