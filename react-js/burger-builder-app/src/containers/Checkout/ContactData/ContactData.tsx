import React, { Component } from 'react'
import Button from "../../../components/UI/Button/Button";
import { OrderableIngredients } from '../../../models/Burger';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps, withRouter } from "react-router-dom";
import classes from "./ContactData.module.css";
import axios from '../../../axios-order';
import { OrderingData, ContactInputElements } from '../../../models/Order';
import Input from '../../../components/UI/Input/Input';

type ContactDataProps = {
    ingredients: OrderableIngredients;
    totalPrice: number;
}

class ContactData extends Component<ContactDataProps & RouteComponentProps> {

    state: {[indexing: string]: any} = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP CODE'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {
                                value: 'fastest',
                                displayValue: 'Fastest'
                            },
                            {
                                value: 'cheapest',
                                displayValue: 'Cheapest'
                            }
                        ]
                    },
                    value: ''
                }
        },
        loading: false
    }

    inputChangedHandler = (ev: React.ChangeEvent<ContactInputElements>, inputId: string) => {
        // NOTE : Just clone everything before setState()
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputId]
        };

        updatedFormElement.value = ev.target.value;

        updatedOrderForm[inputId] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
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
        let formElements: any = [];
        formElements = Object.keys(this.state.orderForm)
            .map(fieldName => {
                const fieldValue = this.state.orderForm[fieldName];
                return <Input key={fieldName} 
                    elementType={fieldValue.elementType} 
                    elementConfig={fieldValue.elementConfig} 
                    value={fieldValue.value}
                    changed={(event: React.ChangeEvent<ContactInputElements>) => this.inputChangedHandler(event, fieldName)}
                    />
            });
        let form = (<form>
            {formElements}
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
