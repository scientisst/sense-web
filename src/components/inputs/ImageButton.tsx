import Link from "next/link"

import joinClassNames from "../utils/joinClassNames"

export interface ImageAnchorProps {
	children?: React.ReactNode
	className?: string
	style?: React.CSSProperties
	ariaLabel?: string
}

const ImageAnchor: React.FC<ImageAnchorProps> = ({
	children,
	className,
	ariaLabel,
	...props
}) => {
	return (
		<button
			className={joinClassNames(
				"flex items-center justify-center leading-none motion-safe:hover:scale-hover motion-safe:active:scale-pressed",
				className
			)}
			aria-label={ariaLabel}
			{...props}
		>
			{children}
		</button>
	)
}

export default ImageAnchor
