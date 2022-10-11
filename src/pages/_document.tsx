import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body className="bg-secondary">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
