import joinClassNames from "../utils/joinClassNames"
import { TintColor, tintBackgroundClass } from "../utils/tints"

export type TextButtonSize = "base" | "lg"

export interface TextButtonProps {
	children?: React.ReactNode
	tint: TintColor
	size: TextButtonSize
	className?: string
	style?: React.CSSProperties
	onClick?: React.ComponentPropsWithoutRef<"button">["onClick"]
	onBlur?: React.ComponentPropsWithoutRef<"button">["onBlur"]
	onFocus?: React.ComponentPropsWithoutRef<"button">["onFocus"]
}

const sizeClasses: Record<TextButtonSize, string> = {
	base: "py-2 px-5 text-base drop-shadow-md motion-safe:hover:drop-shadow-lg motion-safe:active:drop-shadow",
	lg: "py-4 px-8 text-lg drop-shadow-lg motion-safe:hover:drop-shadow-xl motion-safe:active:drop-shadow-md"
}

const TextButton: React.FC<TextButtonProps> = ({
	children,
	tint,
	size,
	className,
	...props
}) => {
	return (
		<button
			className={joinClassNames(
				"flex items-center justify-center rounded-lg font-medium uppercase motion-safe:hover:scale-hover motion-safe:active:scale-pressed",
				tintBackgroundClass[tint],
				sizeClasses[size],
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}

export default TextButton
