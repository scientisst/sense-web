import { forwardRef } from "react"

import clsx from "clsx"

export type TextButtonSize = "base" | "lg"

export interface TextButtonProps {
	children?: React.ReactNode
	/* The size of the button */
	size: TextButtonSize
	className?: string
	style?: React.CSSProperties
	onClick?: React.ComponentPropsWithoutRef<"button">["onClick"]
	onBlur?: React.ComponentPropsWithoutRef<"button">["onBlur"]
	onFocus?: React.ComponentPropsWithoutRef<"button">["onFocus"]
	disabled?: boolean
}

const sizeToClassName: Record<TextButtonSize, string> = {
	base: "h-12 px-6 text-base drop-shadow-md motion-safe:hover:drop-shadow-lg motion-safe:active:drop-shadow",
	lg: "h-16 px-9 text-lg drop-shadow-lg motion-safe:hover:drop-shadow-xl motion-safe:active:drop-shadow-md"
}

const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
	({ children, size, className, disabled, ...props }, ref) => {
		return (
			<button
				className={clsx(
					"flex items-center justify-center rounded-lg font-medium uppercase",
					"motion-safe:hover:scale-hover motion-safe:active:scale-pressed",
					"bg-primary text-over-primary-highest",
					{
						"pointer-events-none opacity-50": disabled
					},
					sizeToClassName[size],
					className
				)}
				ref={ref}
				disabled={disabled}
				{...props}
			>
				{children}
			</button>
		)
	}
)

TextButton.displayName = "TextButton"

export default TextButton
