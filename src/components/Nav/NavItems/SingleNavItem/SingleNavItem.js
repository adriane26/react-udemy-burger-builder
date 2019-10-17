import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './SingleNavItem.module.css';

const singleNavItem = (props) => (
    <li className={classes.SingleNavItem}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>{props.children} </NavLink>
    </li>
    // className={props.active ? classes.active : null}
);

export default singleNavItem;