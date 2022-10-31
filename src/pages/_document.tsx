import { Head, Html, Main, NextScript } from "next/document"

import clsx from "clsx"

import { themeTw } from "../styles/theme"

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
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
