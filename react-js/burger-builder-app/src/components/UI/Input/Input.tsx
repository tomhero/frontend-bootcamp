import React from 'react';
import classes from './Input.module.css';
import { ContactInputElements } from '../../../models/Order';

type InputProp = {
    elementType: string;
    elementConfig: any;
    label?: string;
    value?: any;
    invalid?: boolean
    shouldValidate: boolean;
    touched: boolean;
    changed: (event: React.ChangeEvent<ContactInputElements>) => void
}

const Input = (props: InputProp) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case 'textarea':
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case 'select':
            inputElement = <select
                className={inputClasses.join(' ')}
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
                className={inputClasses.join(' ')}
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

