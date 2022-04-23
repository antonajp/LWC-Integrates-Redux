import { LightningElement } from 'lwc';
import { selectors } from 'c/store';
import { lwcReduxMixin } from 'c/lwcBindings';
const { todoBadgeSelector } = selectors;
export default class TodoBadge extends lwcReduxMixin({ mapStateToProps: todoBadgeSelector,  }, LightningElement) {
    outstandingTodos = [];
    progress = 0;

    get hasTodos() {
        return this.outstandingTodos && this.outstandingTodos.length;
    }

}
