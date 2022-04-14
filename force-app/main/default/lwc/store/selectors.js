import { reselect } from 'c/reduxLibs';

const { createSelector } = reselect;

export const todoSelector = createSelector(state => state.todoReducer, todoReducer => todoReducer.todos || []);