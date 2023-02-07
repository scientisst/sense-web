import { useEffect, useState } from "react"

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
function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debouncedValue
}

export default useDebounce
