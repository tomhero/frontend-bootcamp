import React from 'react';
import Radium from "radium";
import './Person.css'

const person = (props) => {
    const style = {
        '@media (min0width: 500px)': {
            width: '450px'
        }
    }
    return (
            <div className="person-item" style={style}>
                <p onClick={props.click}>I'm Person | {props.name} | {props.age} | {props.children}</p>
                <input onChange={props.change} value={props.name} type="text" />
            </div>
        )
}

export default Radium(person);
