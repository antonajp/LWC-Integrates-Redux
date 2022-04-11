import {
    ADD_TODO,
    TOGGLE_TODO
} from "./actionTypes";

export const todoReducer = (state = { todos: [] }, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [
                    {
                        id: state.todos.length,
                        text: action.text,
                        completed: false
                    },
                    ...state.todos
                ]
            };
        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos && state.todos.map((todo) => {
                    if (todo.id === action.id) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        });
                    }
                    return todo;
                })
            };
        default:
            return state;
    }
};