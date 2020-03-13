import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
 
type ModalProp = {
    /** For the best practice --> use React.ReactNode type for child */
    children: React.ReactNode;
    isShowing: boolean;
}

function Modal(props: ModalProp) {
    return (
        <>
        <Backdrop isShowing={props.isShowing}></Backdrop>
        <div 
            className={classes.Modal}
            style={{
                transition: 'all 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86)',
                transform: props.isShowing ? 'translateY(0vh)' : 'translateY(25vh)',
                opacity: props.isShowing ? 1 : 0,
                zIndex: props.isShowing ? 500 : -1,
            }}
            >
            {props.children}
        </div>
        </>
    );
}

export default Modal;