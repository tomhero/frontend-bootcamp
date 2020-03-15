import React, { Component } from 'react'
import Button from "../../../components/UI/Button/Button";
// import { OrderableIngredients } from '../../../models/Burger';
import classes from "./ContactData.module.css";
import axios from '../../../axios-order';

// type ContactDataProps = {
//     ingredients: OrderableIngredients
// }

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (ev) => {
        // NOTE : this.props from Router parent component
        ev.preventDefault();
        // Send data to backend
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Chayut Ruksonya',
                address: {
                    street: 'TestStreet 101',
                    zipCode: '10260',
                    country: 'Thailand'
                },
                email: 'mymail@test.com'
            },
            deliveryMethod: 'Jet'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error))
            .finally(() => { 
                this.setState({loading: false, purchasing: false});
            });
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter you Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Your postal" />
                    <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData
