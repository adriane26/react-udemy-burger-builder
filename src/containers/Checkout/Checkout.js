import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInfo from './ContactInfo/ContactInfo';


class Checkout extends Component {
    // summary, cancel, checkout/continue
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingreds = {};
        let price = 0;
        console.log('these are query.entries');
        console.log(query.entries());
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1]
            } else {
                // ['lettuce', 1]
                ingreds[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingreds, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-info');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                    {/* could also use path={this.props.match.path + '/contact-info'} */}
                <Route 
                    path={this.props.match.url + '/contact-info'} 
                    render={(props) => (<ContactInfo ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}  />
                    {/* use render instead so we can pass props/ingredients component={ContactInfo} */}
            </div>
        )
    }

}

export default Checkout;