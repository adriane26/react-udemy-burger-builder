import React from 'react';
import classes from './AllBuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Lettuce', type: 'lettuce'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    
];

// TODO: CHANGE ORDER BUTTON MESSAGE IF DISABLED/if buyable is false
// TODO: show amounts of each ingredient 

const allBuildControls = (props) => (
    <div className={classes.AllBuildControls}>
        <p>Price: ${props.price.toFixed(2)}</p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)} 
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={!props.buyable}
            onClick={props.ordered}>GIMME DAT BURGER    
        </button>
        
    </div>
);

export default allBuildControls;