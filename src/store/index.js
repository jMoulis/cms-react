import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import pageReducer from './reducers/pageReducer';
import pageMiddleware from './middlewares/pageMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  pageReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(pageMiddleware)),
);

export default store;
