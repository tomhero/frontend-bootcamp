import React from 'react';
import classes from './Backdrop.module.css'

type BackdropProp = {
    isShowing: boolean;
}

function Backdrop(props: BackdropProp) {
    return (
        props.isShowing ? <div className={classes.Backdrop}></div> : null
    );
}

export default Backdrop;