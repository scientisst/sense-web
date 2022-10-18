import React from "react"

import { Field, FieldProps } from "formik"

import joinClassNames from "../utils/joinClassNames"
import { tintBorderClass } from "../utils/tints"
import InputErrorLabel from "./common/InputErrorLabel"
import InputLabel from "./common/InputLabel"

export interface TextFieldProps {
	label?: string
	placeholder?: string
	id: string
	center?: boolean
	name: React.ComponentPropsWithoutRef<typeof Field>["name"]
	className?: string
	style?: React.CSSProperties
}

const TextInput: React.FC<TextFieldProps & FieldProps> = ({
	field,
	form: { touched, errors },
	label,
	center = false,
	className,
	style,
	...props
}) => {
	const hasError = !!(touched[field.name] && errors[field.name])

	return (
		<div
			className={joinClassNames(
				"mb-4 flex flex-col items-stretch gap-2",
				className
			)}
			style={style}
		>
			<InputLabel center={center} htmlFor={props.id}>
				{label}
			</InputLabel>
			<input
				{...field}
				{...props}
				type="text"
				className={joinClassNames(
					"rounded-lg border-[3px] bg-primary py-2 px-4 drop-shadow focus:ring-[3px] dark:bg-primary-dark",
					"focus:outline-none focus:ring-tint-red focus:ring-opacity-30 dark:focus:ring-tint-red-dark dark:focus:ring-opacity-40",
					"text-secondary-black placeholder:text-tertiary-black dark:text-secondary-white dark:placeholder:text-tertiary-white",
					tintBorderClass["red"]
				)}
				aria-invalid={hasError ? "true" : "false"}
				aria-errormessage={
					hasError ? `${props.id}-errormessage` : undefined
				}
				aria-placeholder={props.placeholder}
			/>
			<InputErrorLabel
				center={center}
				id={`${props.id}-errormessage`}
				visible={hasError}
			>
				{errors[field.name] as React.ReactNode}
			</InputErrorLabel>
		</div>
	)
}

const TextField: React.FC<TextFieldProps> = props => {
	return <Field {...props} component={TextInput} />
}

export default TextField
