/*
 * Mocked, copied from force-shared:TypeUtils
 */
class TypeUtils {
    isArray(value) {
        return Array.isArray(value);
    }

    isFunction(value) {
        const type = typeof value;
        if (type === 'function') {
            return true;
        }
        return false;
    }

    /**
     * Checks if the object is of type number.
     *
     * @param {Object} value The object to check for.
     * @returns {Boolean} True if the object is of type number, or false otherwise.
     */
     isNumber(value) {
        return typeof value === 'number';
    }

    isObject(obj) {
        return typeof obj === 'object' && obj !== null && !this.isArray(obj);
    }

    isPlainObject(value) {
        const objectProto = value !== null && typeof value === 'object'  && Object.getPrototypeOf(value);
        return value !== null && typeof value === 'object' &&
            ((value.constructor && value.constructor.name === 'Object') || (objectProto && objectProto.constructor && objectProto.constructor.name === 'Object'));
    }

    isString(value) {
        return typeof value === 'string';
    }
}
export const typeUtils = new TypeUtils();