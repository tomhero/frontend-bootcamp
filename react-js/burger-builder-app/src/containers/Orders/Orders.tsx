import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import { OrderingData } from '../../models/Order';
import { connect, ConnectedProps } from 'react-redux' 
import * as action from '../../store/actions/index'
import { RootState } from '../../store/index'

class Orders extends Component<PropsFromRedux> {

    componentDidMount() {
        // fetch orders
        console.log('componentDidMount');
        this.props.onFetchOrders()
    }

    render() {

        let orders: any = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map((order: OrderingData) => {
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

const mapStateToProps = (state: RootState) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onFetchOrders: () => dispatch(action.fetchOrders())
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Orders);