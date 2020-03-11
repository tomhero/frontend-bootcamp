import React, { Component } from 'react';
import PropTypes from "prop-types";
import personStyle from './Person.module.css';
// import Aux from "../../../hoc/Auxiliary";
import withClass from '../../../hoc/withClass'

class Person extends Component {

    // since react 16.3 --> React.createRef();
    constructor(props) {
        super(props);
        this.nameInputRef = React.createRef(); // $ref In Vue JS
    }

    componentDidMount() {
        // this.nameInputEl.focus();
        this.nameInputRef.current.focus();
    }

    render() {
        console.log('rendering...');
        return (
            <React.Fragment>
                <p onClick={this.props.click}>I'm Person | {this.props.name} | {this.props.age} | {this.props.children}</p>
                <input 
                    onChange={this.props.change} 
                    value={this.props.name} 
                    type="text"
                    // ref={(myInputEl) => {this.nameInputEl = myInputEl}}
                    ref={this.nameInputRef} // $ref In Vue JS
                     />
            </React.Fragment>
        )
    }

}

// .propTypes must be camelCase !important
Person.propTypes = {
    // Prop type check / constraint
    click: PropTypes.func, // PropTypes.someConstraint --> `PropTypes` must matching with import alias
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass(Person, personStyle['person-item']);
