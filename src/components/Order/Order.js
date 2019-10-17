import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    const ingreds = [];
    for (let i in props.ingredients) {
        ingreds.push(
            {name: i, 
            amt: props.ingredients[i]}
        );
    }

    const ingredOutput = ingreds.map(ig => {
        return <span className={classes.ingredients} key={ig.name}>{ig.name}: {ig.amt} </span>
    });


    return (
    <div className={classes.Order}>
        <p>Ingredients: {ingredOutput}</p>
        <p>Price: ${Number.parseFloat(props.price).toFixed(2)}</p>
        <p>Customer Info </p>
        <p>Name: {props.customer.name}, Email: {props.customer.email}</p>
        <p>Address: {props.customer.address.street}</p>
        <p>{props.customer.address.city}, {props.customer.address.zipCode}, {props.customer.address.country}</p>
    </div>);
};

export default order;