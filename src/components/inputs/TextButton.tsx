import joinClassNames from "../utils/joinClassNames"
import { TintColor, tintBackgroundClass } from "../utils/tints"

export type TextButtonSize = "base" | "lg"

export interface TextButtonProps {
	children?: React.ReactNode
	tint: TintColor
	size: TextButtonSize
	className?: string
	style?: React.CSSProperties
}

const sizeClasses: Record<TextButtonSize, string> = {
	base: "py-2 px-5 text-base",
	lg: "py-4 px-8 text-lg"
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
