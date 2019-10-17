import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactInfo.module.css';

class ContactInfo extends Component {
    state = {
        name: 'a',
        email: 'b',
        address: {
            street: 'c',
            city: 'd',
            zip: 'e'
        },
        loading: false
    }

    orderHandler = (e) => {
        console.log(this.props.ingredients);
        e.preventDefault();
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            //pass total price from burgerbuilder to checkout
            price: this.props.price,
            customer: {
                name: 'bobbb',
                address: {
                    street: 'main',
                    city: 'nopeville',
                    zipCode: '90210',
                    country: 'Canada'
                },
                 email: 'fake@mcfakeface.com'
            }
        }
        // alert('yasss');
        axios.post('/orders.json', order)
            .then(res => {
                console.log(res);
                this.setState({
                    loading: false, 
                    // buying: false,  
                    ingredients: {
                        lettuce: 0,
                        bacon: 0,
                        cheese: 0,
                        meat: 0
                     },
                     totalPrice: 4
                });
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false});
            });

    }

    cancelOrderHandler = () => {
        this.props.history.goBack();
    }

    render () {
        let form = (  
            <form>
                <input type="text" name="name" id="nameInput" placeholder="Name" />
                <input type="text" name="email" placeholder="Email address" />
                <input type="text" name="street" placeholder="Address" />
                <input type="text" name="city" placeholder="City" />
                <input type="text" name="zip" placeholder="Zip" />
                <br/>
                <Button btnType="Success" clicked={this.orderHandler}>Place Order, Yo</Button>
                <Button btnType="Danger">...Nah</Button>
            </form>);
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactInfo}>
                <h4>Contact info, plz</h4>
                {/* <form>
                    <input type="text" name="name" id="nameInput" placeholder="Name" />
                    <input type="text" name="email" placeholder="Email address" />
                    <input type="text" name="street" placeholder="Address" />
                    <input type="text" name="city" placeholder="City" />
                    <input type="text" name="zip" placeholder="Zip" />
                    <br/>
                    <Button btnType="Success" clicked={this.orderHandler}>Place Order, Yo</Button>
                    <Button btnType="Danger">...Nah</Button>
                </form> */}
                {form}
            </div>
        )
    }
}

export default ContactInfo;