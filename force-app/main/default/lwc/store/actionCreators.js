import {
    ADD_TODO,
    TOGGLE_TODO
} from "./actionTypes";

import { dispatch } from "./store";

export function addTodo(text) {
    return dispatch({ type: ADD_TODO, text });
}

export function toggleTodo(id) {
    return dispatch({ type: TOGGLE_TODO, id });
}