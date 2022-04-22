import { reselect } from 'c/reduxLibs';

const { createSelector } = reselect;

export const todoSelector = createSelector(state => state.todoReducer, todoReducer => todoReducer.todos || []);

export const todoBadgeSelector = createSelector(todoSelector, (todos) => {
    return todos.filter((todo) => !todo.completed);
});