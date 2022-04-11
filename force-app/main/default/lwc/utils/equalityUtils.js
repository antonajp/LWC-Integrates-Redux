import { typeUtils } from './typeUtils';
/**
 * Copied from force:shared EqualityUtils
 */
 class EqualityUtils {
    /**
     * Checks if the object is empty.
     * An empty object's value is undefined, null, an empty array, or empty string. An object with no native
     * properties is not considered empty.
     *
     * @param {Object} obj The object to check for.
     * @returns {Boolean} True if the object is empty, or false otherwise.
     */
    isEmpty(obj) {
        if (obj === undefined || obj === null || obj === '') {
            return true;
        }
        if (typeUtils.isArray(obj)) {
            return obj.length === 0;
        } else if (typeUtils.isPlainObject(obj)) {
            return Object.keys(obj).length === 0;
        }
        return false;
    }

    /**
     * Checks if the object is undefined or null.
     *
     * @param {Object} obj The object to check for.
     * @returns {Boolean} True if the object type is undefined or null, or return false otherwise.
     */
    isUndefinedOrNull(obj) {
        return obj === undefined || obj === null;
    }

    /**
     * Returns true if first is equal to second. Supports boolean, number, object, array,
     * and string types. Does NOT support regexp or dates. Functions are always
     * assumed not equal. If the comparison requires more than 10 recursive calls,
     * this will return false.
     *
     * @param {Boolean|Number|Object|Array|String} first First item to compare
     * @param {Boolean|Number|Object|Array|String} second Second item to compare
     * @param {Integer} depth Limit to object recursion depth
     * @returns {boolean} Whether first is equal to second, considering type complexities
     */
    isEqual(first, second, depth) {
        if (first === second) {
            return true;
        }
        if (this.isUndefinedOrNull(depth)) {
            depth = 0;
        } else if (depth > 10) {
            return false;
        }
        if (typeUtils.isNumber(first) && typeUtils.isNumber(second)) {
            return first === second;
        } else if (typeUtils.isArray(first) && typeUtils.isArray(second) && first.length === second.length) {
            for (let i = 0; i < first.length; i++) {
                if (!this.isEqual(first[i], second[i], depth + 1)) {
                    return false;
                }
            }
            return true;
        } else if (typeUtils.isPlainObject(first) && typeUtils.isPlainObject(second)) {
            return this._isEqualPlainObjects(first, second, depth);
        }
        return false;
    }

    /**
     * Helper function used inside isEqual() for comparing plain object types
     * Returns true if first is equal to second.
     *
     * @param {Object} first First item to compare
     * @param {Object} second Second item to compare
     * @param {Integer} depth Limit to object recursion depth
     * @returns {boolean} Whether first is equal to second, considering plain object type complexities
     */
    _isEqualPlainObjects(first, second, depth) {
        const fnames = Object.getOwnPropertyNames(first).sort();
        const snames = Object.getOwnPropertyNames(second).sort();
        // If internet explorer we may need to sanitize the property names so
        // that polyfill WeakMap bits are not compared for equivalency
        if (typeof WeakMap === 'undefined' || WeakMap.toString().indexOf('function WeakMap()') !== 0) {
            for (let idx = 0; idx < fnames.length; idx++) {
                if (fnames[idx] && fnames[idx].indexOf('__st') === 0) {
                    fnames.splice(idx, 1);
                    idx--;
                }
            }
            for (let idx = 0; idx < snames.length; idx++) {
                if (snames[idx] && snames[idx].indexOf('__st') === 0) {
                    snames.splice(idx, 1);
                    idx--;
                }
            }
        }
        if (fnames.length === snames.length) {
            for (let j = 0; j < fnames.length; j++) {
                // must match property name and value
                if (fnames[j] !== snames[j] || !this.isEqual(first[fnames[j]], second[snames[j]], depth + 1)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}

export const equalityUtils = new EqualityUtils();