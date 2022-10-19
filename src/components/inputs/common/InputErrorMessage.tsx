import joinClassNames from "../../utils/joinClassNames"
import { tintToClassName } from "../../utils/tints"

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
			className={joinClassNames(
				"text-ellipsis",
				tintToClassName["text"]["red"],
				center ? "text-center" : "",
				visible ? "block" : "hidden"
			)}
			id={id}
			aria-live="polite"
		>
			{children}
		</span>
	)
}

export default InputErrorMessage
