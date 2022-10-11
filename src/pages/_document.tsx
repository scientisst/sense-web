import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="preload"
					href="/static/imagine.otf"
					as="font"
					type="font/opentype"
					crossOrigin="anonymous"
				/>
				{/* <link href="/static/imagine.css" rel="stylesheet" /> */}
			</Head>
			<body className="bg-secondary">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
