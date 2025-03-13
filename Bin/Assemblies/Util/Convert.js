"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
class Convert {
    static ToInt16(value, radix) {
        return parseInt(value, radix);
    }
    static ToUInt16(value, radix) {
        return parseInt(value, radix);
    }
    static ToInt32(value, radix) {
        return parseInt(value, radix);
    }
    static ToUInt32(value, radix) {
        return parseInt(value, radix);
    }
    static ToInt64(value, radix) {
        return parseInt(value, radix);
    }
    static ToUInt64(value, radix) {
        return parseInt(value, radix);
    }
    static ToBoolean(value, def) {
        if (typeof value === 'boolean')
            return value;
        const valueAsNumber = parseInt(value);
        if (!isNaN(valueAsNumber)) {
            return valueAsNumber > 0;
        }
        const defaultReturn = def !== undefined && def !== null ? def : false;
        value = typeof value === 'string' ? value.toLowerCase() : null;
        if (value === null)
            return defaultReturn;
        try {
            return JSON.parse(value);
        }
        catch {
            return defaultReturn;
        }
    }
}
exports.Convert = Convert;
