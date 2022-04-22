import { LightningElement, track } from 'lwc';
import { selectors, actionCreators } from 'c/store';
import { lwcReduxMixin } from 'c/lwcBindings';
const { todoBadgeSelector } = selectors;
export default class TodoBadge extends lwcReduxMixin({ mapStateToProps: todoBadgeSelector, propName: 'outstandingTodos' }, LightningElement) {
    outstandingTodos = [];

    get hasTodos() {
        return this.outstandingTodos && this.outstandingTodos.length;
    }
}