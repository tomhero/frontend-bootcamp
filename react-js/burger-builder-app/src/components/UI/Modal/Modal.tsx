import React from 'react';
import classes from './Modal.module.css'

type ModalProp = {
    /** For the best practice --> use React.ReactNode type for child */
    children: React.ReactNode;
}

function Modal(props: ModalProp) {
    return (
        <div className={classes.Modal}>
            {props.children}
        </div>
    );
}

export default Modal;