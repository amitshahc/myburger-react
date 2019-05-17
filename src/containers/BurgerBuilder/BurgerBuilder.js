import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


class BurgerBuilder extends Component {
    
    constructor(props) {
        super(props);

        this.INGREDIENT_PRICES = {
            "salad" : 0.5,
            "bacon" : 0.4,
            "cheese" : 1.3,
            "meat" : 0.7,  
        }

        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            total_price: 4,
        }
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAdition = this.INGREDIENT_PRICES[type];
        const oldPrice = this.state.total_price;
        const newPrice = oldPrice + priceAdition;

        this.setState({total_price: newPrice, ingredients: updatedIngredients})
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAdition = this.INGREDIENT_PRICES[type];
        const oldPrice = this.state.total_price;
        const newPrice = oldPrice - priceAdition;

        this.setState({total_price: newPrice, ingredients: updatedIngredients})
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        console.log(disabledInfo);
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.total_price}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;