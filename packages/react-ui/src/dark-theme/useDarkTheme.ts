import { useEffect, useState } from "react"

import useMediaQuery from "../hooks/useMediaQuery"

const useDarkTheme = () => {
	const [darkTheme, setDarkTheme] = useState(false)
	const darkPreference = useMediaQuery("(prefers-color-scheme: dark)")

	useEffect(() => {
		if (localStorage && localStorage.getItem("darkTheme") !== null) {
			setDarkTheme(localStorage.getItem("darkTheme") === "true")
		} else {
			setDarkTheme(darkPreference)
		}
	}, [darkPreference])

	useEffect(() => {
		const observer = new MutationObserver(() => {
			setDarkTheme(document.documentElement.classList.contains("dark"))
		})

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		})

		return () => {
			observer.disconnect()
		}
	}, [])

	return darkTheme
}

export default useDarkTheme
