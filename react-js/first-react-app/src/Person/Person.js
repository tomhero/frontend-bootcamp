import React from 'react';
import './Person.css'

const person = (props) => {
    return (
            <div className="person-item" onClick={props.click}>
                <p>I'm Person | {props.name} | {props.age} | {props.children}</p>
            </div>
        )
}

export default person;
