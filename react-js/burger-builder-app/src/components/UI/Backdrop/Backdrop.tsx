import React from 'react';
import classes from './Backdrop.module.css'

type BackdropProp = {
    isShowing: boolean;
    clicked?: () => void;
}

function Backdrop(props: BackdropProp) {
    return (
        props.isShowing ? <div onClick={props.clicked} className={classes.Backdrop}></div> : null
    );
}

export default Backdrop;