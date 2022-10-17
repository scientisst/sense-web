import joinClassNames from "../../utils/joinClassNames"

export interface InputLabelProps {
	children: React.ReactNode
	center?: boolean
	htmlFor: string
}

const InputLabel: React.FC<InputLabelProps> = ({
	children,
	center = false,
	htmlFor
}) => {
	return children ? (
		<label
			className={joinClassNames(
				"imagine-font text-2xl",
				center && "text-center"
			)}
			htmlFor={htmlFor}
		>
			{children}
		</label>
	) : (
		<></>
	)
}

export default InputLabel
