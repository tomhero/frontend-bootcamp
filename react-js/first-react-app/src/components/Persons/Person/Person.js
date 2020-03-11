import React from 'react';
import PropTypes from "prop-types";
import personStyle from './Person.module.css';
// import Aux from "../../../hoc/Auxiliary";
import withClass from '../../../hoc/withClass'

const Person = (props) => {
    console.log('rendering...');
    return (
        // <div className={personStyle['person-item']}>
        // <Aux> component does the React.createElement() function call then send chidren pass down to itself.
        // Same as <React.Fragment>
        <React.Fragment>
            <p onClick={props.click}>I'm Person | {props.name} | {props.age} | {props.children}</p>
            <input onChange={props.change} value={props.name} type="text" />
        </React.Fragment>
        // </div>
    )

}

// .propTypes must be camelCase !important
Person.propTypes = {
    // Prop type check / constraint
    click: PropTypes.func, // PropTypes.someConstraint --> `PropTypes` must matching with import alias
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass(Person, personStyle['person-item']);
