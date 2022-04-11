import { LightningElement, api } from 'lwc';
import { actions } from "c/store";
const { toggleTodo } = actions;
export default class TodoItem extends LightningElement {
    @api item
    get styleClass() {
        return this.item.completed ? 'strikeThrough' : '';
    }
    handleClick() {
        toggleTodo(this.item.id);
    }
}