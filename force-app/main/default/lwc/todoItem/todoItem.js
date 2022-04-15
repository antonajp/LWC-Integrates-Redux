import { LightningElement, api } from 'lwc';
import { actionCreators } from "c/store";
const { toggleTodo } = actionCreators;
export default class TodoItem extends LightningElement {
    @api item
    get styleClass() {
        return this.item.completed ? 'strikeThrough' : '';
    }
    handleClick() {
        toggleTodo(this.item.id);
    }
}