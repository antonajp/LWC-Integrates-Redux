import { Redux, thunk } from "c/reduxLibs";

import * as reducers from "./reducers";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as selectors from "./selectors";

const { compose, createStore, applyMiddleware, combineReducers } = Redux;

const middleware = [thunk];

const reduxDevToolProp = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
const composeEnhancers = window[reduxDevToolProp] || compose;

/**
 * Our global Redux store instance
 */
export const store = createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(...middleware))
);

export const { dispatch, subscribe, unsubscribe } = store;

export { actions, actionTypes, reducers, selectors };