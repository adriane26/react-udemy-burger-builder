import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            console.log(igKey);
            return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>);
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: ${props.price.toFixed(2)}</p>
            <Button btnType="Success" clicked={props.purchaseGo}>NOMS</Button>
            <Button btnType="Danger" clicked={props.purchaseNo}>Adjust Noms</Button>
        </Aux>
    )
};

export default orderSummary;