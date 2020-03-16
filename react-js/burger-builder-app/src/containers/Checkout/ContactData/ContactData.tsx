import React, { Component } from 'react'
import Button from "../../../components/UI/Button/Button";
import { OrderableIngredients } from '../../../models/Burger';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps, withRouter } from "react-router-dom";
import classes from "./ContactData.module.css";
import axios from '../../../axios-order';
import { OrderingData } from '../../../models/Order';
import Input from '../../../components/UI/Input/Input';

type ContactDataProps = {
    ingredients: OrderableIngredients;
    totalPrice: number;
}

class ContactData extends Component<ContactDataProps & RouteComponentProps> {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (ev: React.MouseEvent) => {
        // NOTE : this.props from Router parent component
        ev.preventDefault();
        // Send data to backend
        this.setState({ loading: true });
        const order: OrderingData = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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
                // NOTE : Because of {...props} form parent component
                this.setState({ loading: false, purchasing: false });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false, purchasing: false });
            })
    }

    render() {
        let form = (<form>
            <Input inputtype="input" type="text" name="name" placeholder="Your name" />
            <Input inputtype="input" type="email" name="email" placeholder="Your email" />
            <Input inputtype="input" type="text" name="street" placeholder="Your Street" />
            <Input inputtype="input" type="text" name="postal" placeholder="Your postal" />
            <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter you Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default withRouter(ContactData);
