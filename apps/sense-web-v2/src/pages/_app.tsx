import type { AppProps } from "next/app"

import { ChakraProvider } from "@chakra-ui/react"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"

import "../styles/global.css"

config.autoAddCss = false

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}
