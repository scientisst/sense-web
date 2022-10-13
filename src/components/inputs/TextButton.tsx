import joinClassNames from "../utils/joinClassNames"
import { TintColor } from "../utils/tints"

export type TextButtonSize = "base" | "lg"

export interface TextButtonProps {
	children?: React.ReactNode
	tint: TintColor
	size: TextButtonSize
	className?: string
	style?: React.CSSProperties
}

const tintColorClasses: Record<TintColor, string> = {
	yellow: "bg-tint-yellow dark:bg-tint-yellow-dark text-primary-black",
	green: "bg-tint-green dark:bg-tint-green-dark text-primary-white",
	mint: "bg-tint-mint dark:bg-tint-mint-dark text-primary-white",
	blue: "bg-tint-blue dark:bg-tint-blue-dark text-primary-white",
	purple: "bg-tint-purple dark:bg-tint-purple-dark text-primary-white",
	red: "bg-tint-red dark:bg-tint-red-dark text-primary-white",
	orange: "bg-tint-orange dark:bg-tint-orange-dark text-primary-white"
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
				tintColorClasses[tint],
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
