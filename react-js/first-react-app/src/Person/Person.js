import React from 'react';
import personStyle from './Person.module.css';

const person = (props) => {
    console.log(personStyle);
    return (
            <div className="person-item">
                <p onClick={props.click}>I'm Person | {props.name} | {props.age} | {props.children}</p>
                <input onChange={props.change} value={props.name} type="text" />
            </div>
        )
}

export default person;
