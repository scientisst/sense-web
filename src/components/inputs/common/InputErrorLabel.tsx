import joinClassNames from "../../utils/joinClassNames"

export interface InputErrorLabelProps {
	children: React.ReactNode
	center?: boolean
	id: string
	visible: boolean
}

const InputErrorLabel: React.FC<InputErrorLabelProps> = ({
	children,
	center = false,
	visible,
	id
}) => {
	return (
		<span
			className={joinClassNames(
				"text-tint-red dark:text-tint-red-dark",
				center && "text-center",
				visible ? "block" : "hidden"
			)}
			id={id}
			aria-live="polite"
		>
			{children}
		</span>
	)
}

export default InputErrorLabel
