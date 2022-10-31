import clsx from "clsx"

export interface ImageAnchorProps {
	children?: React.ReactNode
	className?: string
	style?: React.CSSProperties
	ariaLabel?: string
	onClick?: React.ComponentPropsWithoutRef<"button">["onClick"]
	onBlur?: React.ComponentPropsWithoutRef<"button">["onBlur"]
	onFocus?: React.ComponentPropsWithoutRef<"button">["onFocus"]
}

const ImageAnchor: React.FC<ImageAnchorProps> = ({
	children,
	className,
	ariaLabel,
	...props
}) => {
	return (
		<button
			className={clsx(
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
