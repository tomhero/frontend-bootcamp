import React from 'react';

const person = (props) => {
    return (
            <p>I'm Person | {props.name} | {props.age} | {props.children}</p>
        )
}

export default person;
