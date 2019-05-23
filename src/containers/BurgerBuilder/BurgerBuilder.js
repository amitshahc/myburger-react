import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';


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
            purchasable: false
        }
    }

    updatePurchaseState(ingredients) {
        // const ingredients = {
        //     ...this.state.ingredients
        // };

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        
        this.setState({ purchasable: sum > 0 });
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

        this.setState({ total_price: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
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

        this.setState({ total_price: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
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
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.total_price}
                    purchasable={this.state.purchasable}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;