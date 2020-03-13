import React from 'react';

const DrawerToggle = (props: {clicked: (ev: React.MouseEvent) => void}) => {
    return (
        <div onClick={props.clicked}>
            MENU
        </div>
    )
}

export default DrawerToggle;
