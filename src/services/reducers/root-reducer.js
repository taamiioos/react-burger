import {combineReducers} from 'redux';
import ingredientsReducer from './ingredients-reducer';
import constructorReducer from './constructor-reducer';
import orderReducer from './order-reducer';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer, constructorIngredients: constructorReducer, order: orderReducer,
});

export default rootReducer;
