import { store } from 'c/store';
import { equalityUtils } from "c/utils";

export function subscribeAuraCmp(cmp, handler, selector = null) {
    // keep a map of component instance to last known state value (key: cmp, value: last known value)
    const previousValues = new WeakMap();

    const auraComponentReduxStateChanged = () => {
        const state = store.getState();
        const last = previousValues.get(cmp);
        if (selector) {
            // only trigger event if next is different from last
            const next = selector(state);
            if (!equalityUtils.isEqual(last, next)) {
                previousValues.set(cmp, next);
                handler(next);
            } else {
                // window.console.warn("next is same as last!", last, next);
            }
        } else if (state !== last) { // if you don't specify selector, shallow equal
            // only trigger handler if state has actually changed
            previousValues.set(cmp, state);
            handler(state);
        }
    };

    // subscribe to store changes
    const unsubscribe = store.subscribe(auraComponentReduxStateChanged);

    // handle component destroy
    const eventName = "markup://aura:valueDestroy",
        phase = "default";
    cmp.addEventHandler(
        eventName,
        function onDestroy() {
            // unsubscribe from Redux state changes
            unsubscribe();

            // remove our destroy event listenter (not sure if this is needed)
            cmp.removeEventHandler(eventName, onDestroy, phase);
        },
        phase
    );

    // populate initial state
    auraComponentReduxStateChanged();
}

/**
 * Bind an Aura component instance attributes to a given state mapper. For example:
 * bindAuraAttributes(cmp, state => { quickActions: quickActionsSelector(state) })
 * where cmp has v.quickActions
 * @param {AuraComponent} cmp The Aura component instance to bind attribute values to
 * @param {(state:any)=> any} mapStateToProps
 */
export function bindAuraAttributes(cmp, mapStateToProps) {
    const validAttributeNames = new Set(
        cmp
            .getDef()
            .getAttributeDefs()
            .getNames()
    );

    return subscribeAuraCmp(
        cmp,
        updatedProps => {
            for (const [attrName, value] of Object.entries(updatedProps)) {
                if (validAttributeNames.has(attrName)) {
                    cmp.set(`v.${attrName}`, value);
                }
            }
        },
        mapStateToProps
    );
}