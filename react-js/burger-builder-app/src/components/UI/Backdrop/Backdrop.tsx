import React from 'react';
import classes from './Backdrop.module.css'

type BackdropProp = {
    /** For the best practice --> use React.ReactNode type for child */
    children: React.ReactNode;
}

function Backdrop(props: BackdropProp) {
    return (
        <div className={classes.Backdrop}>
            {props.children}
        </div>
    );
}

export default Backdrop;