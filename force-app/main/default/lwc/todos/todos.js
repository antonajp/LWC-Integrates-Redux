import { LightningElement, track } from 'lwc';
import { selectors, actionCreators } from 'c/store';
import { lwcReduxMixin } from 'c/lwcBindings';
const { todoSelector } = selectors;
const { addTodo } = actionCreators;
export default class Todos extends lwcReduxMixin({ mapStateToProps: todoSelector, propName: 'todoState' }, LightningElement) {
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