import { useEffect, useState } from "react";
/**
 * Delays the update of a value by a specified amount of time.
 *
 * Every time there's a change in the value, the timer is reset.
 *
 * @template T
 * @param {T} value The value to delay
 * @param {number} delay The delay in milliseconds
 * @returns {T} The delayed value
 */
function useDebounce(value, delay) {
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
        var handler = setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
export default useDebounce;
//# sourceMappingURL=index.js.map