import {compose, createStore, applyMiddleware} from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk';
import rootReducer from './reducers/root-reducer';
import {RootState, AppActions} from './reducers/root-reducer'
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
export type AppDispatch = ThunkDispatch<RootState, any, AppActions>;
