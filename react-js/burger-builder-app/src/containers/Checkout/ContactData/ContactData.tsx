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
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP CODE'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false
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
                    value: 'fastest',
                }
        },
        loading: false
    }

    checkValidity = (value: string, rule: any) => {
        let isValid: boolean = true;
        // NOTE ... && isValid <-- OMG this is the best
        if (rule.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rule.minLength) {
            isValid = value.length >= rule.minLength && isValid;
        }

        if (rule.maxLength) {
            isValid = value.length <= rule.minLength && isValid;
        }

        return isValid;
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
        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.value, 
            updatedFormElement.validation
        );

        console.log(updatedFormElement);

        updatedOrderForm[inputId] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    orderHandler = (ev: React.MouseEvent) => {
        // NOTE : this.props from Router parent component
        ev.preventDefault();
        // Send data to backend
        const orderData: any = {};
        Object.keys(this.state.orderForm)
            .forEach((fieldName: string) => {
                orderData[fieldName] =  this.state.orderForm[fieldName].value
            });
        this.setState({ loading: true });
        const order: OrderingData = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData
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
        // https://stackoverflow.com/questions/47012169/a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-erro
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
