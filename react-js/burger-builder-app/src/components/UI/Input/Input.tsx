import React from 'react';
import classes from './Input.module.css';
import { ContactInputElements } from '../../../models/Order';

type InputProp = {
    elementType: string;
    elementConfig: any;
    label?: string;
    value?: any;
    changed: (event: React.ChangeEvent<ContactInputElements>) => void
}

const Input = (props: InputProp) => {

    let inputElement = null;

    switch (props.elementType) {
        case 'input':
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case 'textarea':
            inputElement = <textarea
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case 'select':
            inputElement = <select
                className={classes.InputElement}
                {...props.elementConfig}
                options=""
                value={props.value}
                onChange={props.changed} >
                {props.elementConfig.options.map((configuredOption: any) => {
                    return <option 
                        key={configuredOption.value} 
                        value={configuredOption.value}>
                            {configuredOption.displayValue}
                        </option>
                })}
            </select>;
            break;
        default:
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;

