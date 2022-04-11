import * as actionCreators from "./actionCreators";

import { dispatch } from "./store";

export function addTodo(text) {
    return dispatch(actionCreators.addTodo(text));
}

export function toggleTodo(id) {
    return dispatch(actionCreators.toggleTodo(id));
}