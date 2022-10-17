import { Head, Html, Main, NextScript } from "next/document"

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
			<body className="bg-primary text-base font-normal leading-6 text-primary-black dark:bg-primary-dark dark:text-primary-white">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
