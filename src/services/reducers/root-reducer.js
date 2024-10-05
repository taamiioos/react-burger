import {combineReducers} from 'redux';
import ingredientsReducer from './ingredients-reducer';
import constructorReducer from './constructor-reducer';
import orderReducer from './order-reducer';
import passwordReducer from './password-reducer';
import authReducer from './auth-reducer';
import profileReducer from './profile-reducer';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer, constructorIngredients: constructorReducer, order: orderReducer,
    passwordForgot: passwordReducer, authUser: authReducer, profile: profileReducer
});

export default rootReducer;
