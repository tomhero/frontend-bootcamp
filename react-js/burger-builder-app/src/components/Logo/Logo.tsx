import React from 'react'
import LogoImage from '../../asset/images/original.png';
import classes from './Logo.module.css';

const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={LogoImage} alt="App Logo" />
        </div>
    )
}

export default Logo
