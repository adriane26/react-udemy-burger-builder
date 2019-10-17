import React from 'react';
// import { withRouter } from 'react-router-dom';
import BurgerIngredient from './Ingredients/Ingredients';
import classes from './Burger.module.css';

const burger = (props) => {
    // need to convert ingredients object sent from burgerbuilder.js into array. props need to be array to use as a list
    let ingredList = Object.keys(props.ingredients)
        .map(ingredKey => {
            return [...Array(props.ingredients[ingredKey])].map((_, i) => {
               return <BurgerIngredient key={ingredKey + i} type={ingredKey} />;
            }); 
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
        if (ingredList.length === 0) {
            ingredList = <p>Your burger is empty!</p>
        }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredList}
            <BurgerIngredient type="bread-bottom" />
        </div>

    );
};

// export default withRouter(burger);
export default burger;