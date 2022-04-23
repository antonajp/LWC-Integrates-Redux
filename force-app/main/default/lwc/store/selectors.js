import { reselect } from 'c/reduxLibs';

const { createSelector } = reselect;

export const todoSelector = createSelector(state => state.todoReducer, todoReducer => todoReducer.todos || []);

export const todoBadgeSelector = createSelector(todoSelector, (todos) => {
    const outstandingTodos = todos.filter((todo) => !todo.completed);
    const progress = todos && todos.length
        ? (todos.length - outstandingTodos.length)/todos.length * 100
        : 100;

    return {
        outstandingTodos,
        progress
    }
});
