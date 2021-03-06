import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

type ModalProp = {
    /** For the best practice --> use React.ReactNode type for child */
    children: React.ReactNode;
    isShowing: boolean;
    modalClosed: () => void;
    clicked?: () => void;
}

class Modal extends Component<ModalProp, {}> {

    shouldComponentUpdate(nextProps: ModalProp, _nextState: {}) {
        // NOTE : for better performance!!
        // NOTEx2 : This may prevent loading spinner to not showing if it has a wrong condition
        return nextProps.isShowing !== this.props.isShowing || nextProps.children !== this.props.children;
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    render() {
        return (
            <>
                <Backdrop isShowing={this.props.isShowing} clicked={this.props.modalClosed}></Backdrop>
                <div
                    className={classes.Modal}
                    style={{
                        transition: 'all 0.375s cubic-bezier(0.785, 0.135, 0.15, 0.86)',
                        transform: this.props.isShowing ? 'translateY(0vh)' : 'translateY(25vh)',
                        opacity: this.props.isShowing ? 1 : 0,
                        zIndex: this.props.isShowing ? 500 : -1,
                    }}
                >
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default Modal;