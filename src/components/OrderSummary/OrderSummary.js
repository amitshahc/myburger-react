import React from 'react';
import Aux from '../../hoc/Auxiliary';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}:{props.ingredients[igKey]}</span>
                </li>
            );
    })
    return (
        <Aux>
            <h3>Your order summary</h3>
            <p>Ingredient list:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );
}

export default OrderSummary;