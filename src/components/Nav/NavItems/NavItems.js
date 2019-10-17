import React from 'react';
import classes from './NavItems.module.css';
import SingleNavItem from './SingleNavItem/SingleNavItem';

const navItems = () => (
    <ul className={classes.NavItems}>
        <SingleNavItem link="/" exact >Build Yo Burger</SingleNavItem>
        {/* <SingleNavItem link="/">Checkout</SingleNavItem> */}
        <SingleNavItem link="/orders">Orders</SingleNavItem>
    </ul>
);

export default navItems;