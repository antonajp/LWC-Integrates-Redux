/** *
 * https://raw.githubusercontent.com/reduxjs/reselect/master/src/index.js
 *
 * https://github.com/reduxjs/reselect/blob/master/LICENSE
 *
 *  The MIT License (MIT)

Copyright (c) 2015-2018 Reselect Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 ***/

function defaultEqualityCheck(a, b) {
    return a === b;
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
        return false;
    }

    // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
    const length = prev.length;
    for (let i = 0; i < length; i++) {
        if (!equalityCheck(prev[i], next[i])) {
            return false;
        }
    }

    return true;
}

export function defaultMemoize(func, equalityCheck = defaultEqualityCheck) {
    let lastArgs = null;
    let lastResult = null;
    // we reference arguments instead of spreading them for performance reasons
    return function () {
        if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
            // apply arguments instead of spreading for performance.
            lastResult = func.apply(null, arguments);
        }

        lastArgs = arguments;
        return lastResult;
    };
}

function getDependencies(funcs) {
    const dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

    if (!dependencies.every(dep => typeof dep === "function")) {
        const dependencyTypes = dependencies.map(dep => typeof dep).join(", ");
        throw new Error(
            "Selector creators expect all input-selectors to be functions, " +
                `instead received the following types: [${dependencyTypes}]`
        );
    }

    return dependencies;
}

export function createSelectorCreator(memoize, ...memoizeOptions) {
    return (...funcs) => {
        let recomputations = 0;
        const resultFunc = funcs.pop();
        const dependencies = getDependencies(funcs);

        const memoizedResultFunc = memoize(function () {
            recomputations++;
            // apply arguments instead of spreading for performance.
            return resultFunc.apply(null, arguments);
        }, ...memoizeOptions);

        // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
        const selector = memoize(function () {
            const params = [];
            const length = dependencies.length;

            for (let i = 0; i < length; i++) {
                // apply arguments instead of spreading and mutate a local list of params for performance.
                params.push(dependencies[i].apply(null, arguments));
            }

            // apply arguments instead of spreading for performance.
            return memoizedResultFunc.apply(null, params);
        });

        selector.resultFunc = resultFunc;
        selector.dependencies = dependencies;
        selector.recomputations = () => recomputations;
        selector.resetRecomputations = () => (recomputations = 0);
        return selector;
    };
}

export const createSelector = createSelectorCreator(defaultMemoize);

export function createStructuredSelector(
    selectors,
    selectorCreator = createSelector
) {
    if (typeof selectors !== "object") {
        throw new Error(
            "createStructuredSelector expects first argument to be an object " +
                `where each property is a selector, instead received a ${typeof selectors}`
        );
    }
    const objectKeys = Object.keys(selectors);
    return selectorCreator(
        objectKeys.map(key => selectors[key]),
        (...values) => {
            return values.reduce((composition, value, index) => {
                composition[objectKeys[index]] = value;
                return composition;
            }, {});
        }
    );
}