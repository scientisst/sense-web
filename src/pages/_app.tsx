import { useEffect } from "react"

import type { AppProps } from "next/app"

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"

import "../styles/global.css"

config.autoAddCss = false

export default function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const currentColorScheme =
			"theme" in localStorage
				? localStorage.theme
				: window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light"

		if (currentColorScheme === "dark") {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
	}, [])

	return <Component {...pageProps} />
}
