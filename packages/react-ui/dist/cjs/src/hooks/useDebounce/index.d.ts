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
declare function useDebounce<T>(value: T, delay: number): T;
export default useDebounce;
