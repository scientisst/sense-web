import { Head, Html, Main, NextScript } from "next/document"

import clsx from "clsx"

import InlineScript from "../components/utils/InlineScript"
import { themeTw } from "../styles/theme"

const code = `
;(function () {
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
})()
`

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
			<body
				className={clsx(
					"text-base font-normal leading-6",
					themeTw.background.background.primary,
					themeTw.text.textOver.background.primary
				)}
			>
				<InlineScript code={code} />
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
