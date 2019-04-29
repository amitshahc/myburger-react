import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngrediants/BurgerIngredient';

const burger = (props) => {

    let orderedIngredients = Object.keys(props.ingredients)
        .map( (item, index) => {
            // console.log("Outer", item, index, props.ingredients[item]);
            return [...Array(props.ingredients[item])].map((v, i) => {
                // console.log("Inner", v, i);
                return <BurgerIngredient key={item+i} type={item} /> 
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    
    if (orderedIngredients.length === 0) {
        orderedIngredients = <p>Please start adding ingredients</p>;
    }
    // console.log(orderedIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {orderedIngredients}    
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger
