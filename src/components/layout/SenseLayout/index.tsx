import React from "react"

import Footer from "./Footer"
import Header from "./Header"

export interface SenseLayoutProps {
	children?: React.ReactNode
	footer?: boolean
	header?: boolean
	style?: React.CSSProperties
	className?: string
	title?: React.ComponentPropsWithoutRef<typeof Header>["title"]
	shortTitle?: React.ComponentPropsWithoutRef<typeof Header>["shortTitle"]
	returnHref?: React.ComponentPropsWithoutRef<typeof Header>["returnHref"]
}

const SenseLayout: React.FC<SenseLayoutProps> = ({
	children,
	style,
	className = "",
	footer = true,
	header = true,
	title,
	shortTitle,
	returnHref
}) => {
	return (
		<div className="grid h-screen w-screen grid-cols-1 grid-rows-[min-content_auto] overflow-hidden">
			{header ? (
				<Header
					title={title}
					shortTitle={shortTitle}
					returnHref={returnHref}
				/>
			) : (
				<div />
			)}
			<div
				className="grid grid-cols-1 grid-rows-[min-content_auto_min-content] content-between overflow-y-auto overflow-x-hidden"
				tabIndex={-1}
			>
				<div></div>
				<div className="flex items-center justify-center overflow-visible">
					<main className={className} style={style}>
						{children}
					</main>
				</div>
				<div className="bg-primary text-over-primary-highest flex justify-center overflow-hidden drop-shadow-lg">
					{footer ? <Footer /> : null}
				</div>
			</div>
		</div>
	)
}

export default SenseLayout
