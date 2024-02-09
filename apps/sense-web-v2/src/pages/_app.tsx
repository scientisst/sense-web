import React, { useEffect } from "react"

import type { AppProps } from "next/app"

import { ChakraProvider } from "@chakra-ui/react"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { Lexend } from "@next/font/google"
import localFont from "@next/font/local"
import { NoSSR, defaultScientISSTTheme } from "@scientisst/chakra-ui"

import "../styles/global.css"
import { loadSettings } from "../utils/constants"

config.autoAddCss = false

const lexend = Lexend({
	weight: ["400", "500", "600", "700", "800"],
	subsets: ["latin"]
})

const imagine = localFont({
	src: "./imagine.ttf"
})

export default function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		const version = localStorage.getItem("version")

		if (version !== "2.8.0") {
			localStorage.clear()
			localStorage.setItem("version", "2.7.0")
		}
	}, [])

	// Load settings
	useEffect(() => {loadSettings()}, [])

	return (
		<NoSSR>
			<ChakraProvider theme={defaultScientISSTTheme}>
				<style jsx global>{`
					:root {
						--font-lexend: ${lexend.style.fontFamily};
						--font-imagine: ${imagine.style.fontFamily};
					}
				`}</style>
				<Component {...pageProps} />
			</ChakraProvider>
		</NoSSR>
	)
}
