import Link from "next/link"

import joinClassNames from "../utils/joinClassNames"

export interface ImageAnchorProps {
	children?: React.ReactNode
	href: React.ComponentPropsWithoutRef<typeof Link>["href"]
	className?: string
	style?: React.CSSProperties
	ariaLabel?: string
}

const ImageAnchor: React.FC<ImageAnchorProps> = ({
	children,
	href,
	className,
	...props
}) => {
	return (
		<Link href={href}>
			<a
				className={joinClassNames(
					"flex items-center justify-center leading-none motion-safe:hover:scale-hover motion-safe:active:scale-pressed",
					className
				)}
				{...props}
			>
				{children}
			</a>
		</Link>
	)
}

export default ImageAnchor
