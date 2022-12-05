import type { AppProps } from "next/app"

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "@scientisst/react-ui/styles.css"

import "../styles/global.css"

config.autoAddCss = false

export default function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}
