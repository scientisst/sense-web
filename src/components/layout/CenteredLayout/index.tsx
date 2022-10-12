import Footer from "./Footer"

export interface CenteredLayoutProps {
	children?: React.ReactNode
	footer?: boolean
	style?: React.CSSProperties
	className?: string
}

const CenteredLayout: React.FC<CenteredLayoutProps> = ({
	children,
	style,
	className = "",
	footer = true
}) => {
	return (
		<div className="grid min-h-screen w-screen grid-cols-1 grid-rows-[min-content_auto_min-content] content-between overflow-hidden">
			<div></div>
			<div className={`flex justify-center`}>
				<main className={className} style={style}>
					{children}
				</main>
			</div>
			<div className="flex justify-center overflow-hidden bg-tint-red text-primary-white">
				{footer ? <Footer /> : null}
			</div>
		</div>
	)
}

export default CenteredLayout
