import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import AllBuildControls from '../../components/Burger/AllBuildControls/AllBuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';

const INGRED_PRICES = {
    lettuce: 0.5,
    bacon: 1,
    cheese: 0.5,
    meat: 1.5
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        // {
        //     lettuce: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        totalPrice: 4,
        buyable: false,
        buying: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://reactburgerbuilder-5c8bc.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    updateBuyableState (ingredients) {
        const ingredAmounts = Object.keys(ingredients)
            .map(igKey => {
            return ingredients[igKey];
        });
        console.log(ingredAmounts);

        const singleNum = ingredAmounts.reduce((ingredAmounts, el) => {
            return ingredAmounts + el;
        }, 0);    
        this.setState({buyable: singleNum > 0});
    }

    addIngredHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngreds = {
            ...this.state.ingredients
        };
        updatedIngreds[type] = updatedCount;
        const addPrice = INGRED_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + addPrice;
        this.setState({totalPrice: newPrice, ingredients: updatedIngreds});
        this.updateBuyableState(updatedIngreds);
    }

    removeIngredHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
             // disable button
             return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngreds = {
            ...this.state.ingredients
        };
        updatedIngreds[type] = updatedCount;
        const subtractPrice = INGRED_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - subtractPrice;
        this.setState({totalPrice: newPrice, ingredients: updatedIngreds});
        this.updateBuyableState(updatedIngreds);
    }

    purchaseHandler = ()  => {
        this.setState({buying: true});
    };

    purchaseCancelHandler = () => {
        this.setState({buying: false});
    }

    purchaseContinueHandler = () => {
        /// MOVING THIS TO CONTACTINFO.JS
        // this.setState({loading: true});

        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'bobbb',
        //         address: {
        //             street: 'main',
        //             zipCode: '90210',
        //             country: 'Canada'
        //         },
        //          email: 'fake@mcfakeface.com'
        //     }
        // }
        // // alert('yasss');
        // axios.post('/orders.json', order)
        //     .then(res => {
        //         console.log(res);
        //         this.setState({
        //             loading: false, 
        //             buying: false,  
        //             ingredients: {
        //                 lettuce: 0,
        //                 bacon: 0,
        //                 cheese: 0,
        //                 meat: 0
        //              },
        //              totalPrice: 4
        //     });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({loading: false, buying: false});
        //     });
        const queryParams = [];
        for (let i in this.state.ingredients) {
            // encodeURIComponent will help with whitespace, etc in URLs
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>ingredients can't be loaded rn...</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <AllBuildControls 
                    ingredientAdded={this.addIngredHandler} 
                    ingredientRemoved={this.removeIngredHandler} 
                    disabled={disabledInfo} 
                    buyable={this.state.buyable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Aux>
            );
            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseNo={this.purchaseCancelHandler}
                    purchaseGo={this.purchaseContinueHandler} />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.buying} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
               {burger}
            </Aux>
        );
    }
}

export default errorHandler(BurgerBuilder, axios);