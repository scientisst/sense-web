import clsx from "clsx"

import { themeTw } from "../../../styles/theme"

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
			className={clsx(
				"text-ellipsis",
				themeTw.text.tint["red"],
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
