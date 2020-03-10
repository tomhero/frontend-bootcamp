import React from 'react';
import styled from 'styled-components';
import './Person.css';

// `styled.div` is a valid React component
const StyledDiv = styled.div`
    @media (min0width: 500px): {
        width: '450px'
    }
`

const person = (props) => {
    return (
            // <div className="person-item" style={style}>
            <StyledDiv className="person-item">
                <p onClick={props.click}>I'm Person | {props.name} | {props.age} | {props.children}</p>
                <input onChange={props.change} value={props.name} type="text" />
            </StyledDiv>
            // </div>
        )
}

export default person;
