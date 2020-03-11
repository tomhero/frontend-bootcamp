import React from 'react';
import personStyle from './Person.module.css';
// import Aux from "../../../hoc/Auxiliary";

const person = (props) => {
    console.log('rendering...');
    return (
        // <div className={personStyle['person-item']}>
        // <Aux> component does the React.createElement() function call then send chidren pass down to itself.
        // Same as <React.Fragment>
        <React.Fragment>
            <p key="i1" onClick={props.click}>I'm Person | {props.name} | {props.age} | {props.children}</p>
            <input key="i2" onChange={props.change} value={props.name} type="text" />
        </React.Fragment>
        // </div>
    )

}

export default person;
