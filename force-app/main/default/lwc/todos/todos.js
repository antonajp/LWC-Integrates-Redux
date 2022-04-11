import { LightningElement, track } from 'lwc';
import { selectors, actions } from 'c/store';
import { boundLightningElement } from 'c/lwcBindings';
const { todoSelector } = selectors;
const { addTodo } = actions;
export default class Todos extends boundLightningElement({ mapStateToProps: todoSelector, propName: 'todoState' }, LightningElement) {
    @track newTodo;
    todoState = null;
    addTodoHandler = () => {
        if (this.newTodo) {
            addTodo(this.newTodo);
            this.newTodo = '';
        }
    }
    changeHandler(event) {
        this.newTodo = event.target.value;
    }
    handleKeydown(event) {
        if (event.which === 13) {
            this.addTodoHandler();
        }
    }
}