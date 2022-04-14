import {
    ADD_TODO,
    TOGGLE_TODO
} from "./actionTypes";

export function addTodo(text) {
    return dispatch => {
        return dispatch({ type: ADD_TODO, text });
    };
}

export function toggleTodo(id) {
    return dispatch => {
        return dispatch({ type: TOGGLE_TODO, id });
    };
}