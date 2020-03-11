import React from "react";

// HOC can hold more than one argument and return function that return JSX
const WithClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent />
        </div>
    );
}

export default WithClass;