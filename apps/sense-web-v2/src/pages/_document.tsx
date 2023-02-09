import { Head, Html, Main, NextScript } from "next/document"

import { ColorModeScript } from "@chakra-ui/react"
import { DarkThemeScript } from "@scientisst/react-ui/dark-theme"

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</Head>
			<body className="bg-background text-over-background-highest text-base font-normal leading-6">
				<ColorModeScript initialColorMode="system" />
				<DarkThemeScript />
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
