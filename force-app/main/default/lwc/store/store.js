import { Redux, thunk } from "c/reduxLibs";

import * as reducers from "./reducers";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import * as selectors from "./selectors";

const { compose, createStore, applyMiddleware, combineReducers } = Redux;

const middleware = [thunk];
const ENABLE_LOGGER_MIDDLEWARE = true;
const loggerMiddleware = store => next => action => {
    const { console } = window;
    console.group(action.type);
    console.info("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
};
if (ENABLE_LOGGER_MIDDLEWARE) {
    middleware.push(loggerMiddleware);
}

const reduxDevToolProp = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
const composeEnhancers = window[reduxDevToolProp] || compose;

/**
 * Our global Redux store instance
 */
export const store = createStore(
    combineReducers(reducers),
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);

export const { dispatch, subscribe, unsubscribe } = store;

export { actions, actionTypes, reducers, selectors };