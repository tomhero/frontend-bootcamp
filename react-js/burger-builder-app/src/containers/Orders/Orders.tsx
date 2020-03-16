import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import { OrderingData } from '../../models/Order';

type OrdersState = {
    orders: OrderingData[];
    loading: boolean;
}

class Orders extends Component<{}, OrdersState> {

    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        // fetch orders
        this.setState({ loading: true });
        axios.get('/orders.json')
            .then(response => {
                // NOTE : Mapping data into a valid form
                const fetchedOrders: OrderingData[] = Object.keys(response.data)
                    .map(orderKey => {
                        return {
                            id: orderKey,
                            ...response.data[orderKey]
                        };
                    })
                console.log(fetchedOrders);
                this.setState({ orders: fetchedOrders });
                this.setState({ loading: false });
            });
    }

    render() {

        let orders: any = <Spinner />
        if (!this.state.loading) {
            orders = this.state.orders.map((order: OrderingData) => {
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            });
        }

        return (
            <div>
                {orders}
            </div>
        );
    }

}

export default Orders;