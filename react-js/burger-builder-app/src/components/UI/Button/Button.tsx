import React from 'react'
import classes from './Button.module.css';

type ButtonProp = {
    children: React.ReactNode;
    clicked: (ev: React.MouseEvent) => void;
    buttonType: string;
}

const Button = (props: ButtonProp) => {
    return (
        <button 
            onClick={props.clicked} 
            className={[classes.Button, classes[props.buttonType]].join(' ')}>
            {props.children}
        </button>
    )
}

export default Button
