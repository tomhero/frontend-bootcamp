import React from "react";
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

const cockpit = props => {

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

export default cockpit;