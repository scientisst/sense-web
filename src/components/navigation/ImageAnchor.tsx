import Link from "next/link"

import clsx from "clsx"

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
	ariaLabel,
	...props
}) => {
	return (
		<Link href={href}>
			<a
				className={clsx(
					"flex items-center justify-center leading-none motion-safe:hover:scale-hover motion-safe:active:scale-pressed",
					className
				)}
				aria-label={ariaLabel}
				{...props}
			>
				{children}
			</a>
		</Link>
	)
}

export default ImageAnchor
