import React, { useEffect } from "react";
import styled from 'styled-components';
import './Cockpit.css'

// `styled.button` is a component with props 
const StyledButton = styled.button`
    background-color: ${props => props.toggleColor ? 'pink' : 'lightgreen'};
    border: 1px solid blue;
    padding: 4px;
    cursor: pointer;

    &:hover {
    background-color: ${props => props.toggleColor ? 'salmon' : 'green'};
    color: white;
    }
`;

// Component name (variable) must a Capital case!!
const Cockpit = props => {

    useEffect(() => {
        console.log('useEffect');
        // Http Request...
        setTimeout(() => {
            alert('data saved');
        }, 1000);
        return () => {
            // This run before the main useEffect but after (first) render cycle!!
            console.log('clean up work for useEffect');
        }
        // You can out a data that should be watched inside the `[]`
        // Or do it when destroy component (To clean up something)
    }, [])

    useEffect(() => {
        console.log('2nd useEffect');
        return () => {
            console.log('clean up work for 2nd useEffect');
        }
    // There is no secound agrument, So it will run every update cycle
    });

    const classes = [];
    if (props.persons.length <= 2) {
        classes.push('red') // class = ['red']
    }

    if (props.persons.length <= 1) {
        classes.push('bold') // class = ['red', 'bold']
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <p className={classes.join(' ')}> This is really working </p>
            <StyledButton
                toggleColor={props.showPerson}
                onClick={props.click}>
                Click for Toggle
            </StyledButton>
        </div>
    );
}

export default Cockpit;