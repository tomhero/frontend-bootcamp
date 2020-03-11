import React from "react";

// HOC can hold more than one argument and return function that return JSX
const WithClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            {/* Passing prop through to WrappedComponent via {...props} syntax!! */}
            <WrappedComponent {...props} />
            {/* <WrappedComponent prop1={prop1} prop2={prop2} and so on... /> */}
        </div>
    );
}

export default WithClass;