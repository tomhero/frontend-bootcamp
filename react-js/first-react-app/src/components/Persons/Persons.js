import React, { PureComponent } from "react";
import Person from "./Person/Person";

class Persons extends PureComponent {

    // 1st update lifecycle
    // static getDerivedStateFromProps(props, state) {
    //     // Don't use this if component have no state!!
    //     console.log('getDerivedStateFromProps', props);
    //     return state;
    // }

    // 2nd update lifecycle
    // NOTE : shouldComponentUpdate that check all data before decide to render is does a same way as `PureComponent`
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('shouldComponentUpdate');
    //     if (nextProps.persons !== this.props.persons 
    //         || nextProps.changed !== this.props.changed
    //         || nextProps.clicked !== this.props.clicked
    //     ) {
    //         // To determine that should update this component when persons prop was changed only!!
    //         // NOTE : performance optimization
    //         // But this is not work because of not deep equal if check above!!
    //         return true
    //     }
    //     return false;
    // }

    // 3rd update lifecycle
    render() {
        console.log('rendering...');
        return this.props.persons.map((person, index) => {
            return <Person
                click={() => this.props.clicked(index)}
                change={({ target }) => this.props.changed(target, person.id)}
                name={person.name}
                age={person.age}
                key={person.id} />
        });
    }

    // 4th update lifecycle
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate');
        return { message: 'Snapshot!!' };
    }

    // 5th update lifecycle
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate');
        console.log(snapshot);
    }

}

export default Persons;