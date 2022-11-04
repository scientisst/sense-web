import clsx from "clsx"

export interface InputErrorMessageProps {
	children: React.ReactNode
	center?: boolean
	id: string
	visible: boolean
}

const InputErrorMessage: React.FC<InputErrorMessageProps> = ({
	children,
	center = false,
	visible,
	id
}) => {
	return (
		<span
			className={clsx("text-primary text-ellipsis", {
				["text-center"]: center,
				["block"]: visible,
				["hidden"]: !visible
			})}
			id={id}
			aria-live="polite"
		>
			{children}
		</span>
	)
}

export default InputErrorMessage
