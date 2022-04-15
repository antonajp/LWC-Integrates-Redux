import { store } from 'c/store';

export function lwcReduxMixin(
    { mapStateToProps = null, propName = null } = {},
    lightningElementCls
) {
    const subscriptions = new WeakMap();
    return class extends lightningElementCls {
        connectedCallback() {
            this.$$notifyStateChange();
            // Redux store subscribe returns a function to unsubscribe (see https://redux.js.org/api/store#subscribelistener)
            const unsubscribeFn = store.subscribe(this.$$notifyStateChange.bind(this));
            subscriptions.set(
                this,
                unsubscribeFn
            );
        }

        disconnectedCallback() {
            // unsubscribe
            if (subscriptions.has(this)) {
                const unsubscribe = subscriptions.get(this);
                unsubscribe();
                subscriptions.delete(this);
            }
        }

        $$notifyStateChange() {
            const state = store.getState();
            const nextState = mapStateToProps(state);

            if (propName && nextState !== this[propName]) {
                this[propName] = nextState;
            } else {
                for (const [key, nextValue] of Object.entries(nextState)) {
                    // trigger update on the LWC component instance IFF value has changed
                    if (this[key] !== nextValue) {
                        this[key] = nextValue;
                    }
                }
            }
        }
    };
}