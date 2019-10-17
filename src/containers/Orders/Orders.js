import React, { Component } from 'react';

import axios from '../../axios-orders';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                console.log('orderzzz');
                console.log(res.data);
                /// loop through and push info into orders array
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({orders: fetchedOrders, loading: false});
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    render () {
        return (
            <div>
                {/* <Order 
                    ingredients={this.state.orders.ingredients}
                    customer={this.state.orders.customer}
                    price={this.state.orders.price}
                    key={this.state.orders.id}
                    /> */}
                    {/* CUSTOMER AND INGREDIENTS ARE OBJECTS WHERE  address={this.state.orders.address} */}
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        customer={order.customer}
                        price={order.price} />
                ))}
            </div> 
        );
    }
}

export default errorHandler(Orders, axios);