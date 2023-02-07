import { useEffect, useState } from "react"

const useMediaQuery = (query: string) => {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		if (typeof window !== "undefined") {
			const mediaQueryList = window.matchMedia(query)
			const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
			setMatches(mediaQueryList.matches)
			mediaQueryList.addEventListener("change", handler)
			return () => mediaQueryList.removeEventListener("change", handler)
		}
	}, [query])

	return matches
}

export default useMediaQuery
