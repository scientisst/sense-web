import React from "react"

import clsx from "clsx"
import { Field, FieldProps } from "formik"

import { TintColor, themeTw } from "../../styles/theme"
import InputErrorMessage from "./common/InputErrorMessage"
import InputLabel from "./common/InputLabel"

interface TextInputProps {
	label?: string
	placeholder?: string
	id: string
	/* Whether the label and error message should be centered or not.... */
	center?: boolean
	tint: TintColor
	className?: string
	style?: React.CSSProperties
}

const TextInput: React.FC<TextInputProps & FieldProps> = ({
	field,
	form: { touched, errors },
	label,
	center = false,
	className,
	style,
	tint,
	...props
}) => {
	const hasError = !!(touched[field.name] && errors[field.name])

	return (
		<div
			className={clsx(
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
				name={field.name}
				type="text"
				className={clsx(
					"h-12 rounded-lg border-3 px-4 drop-shadow",
					"focus:outline-none focus:ring-3 focus:ring-opacity-30 dark:focus:ring-opacity-40",
					themeTw.background.background.primary,
					themeTw.text.textOver.background.secondary,
					themeTw.placeholder.textOver.background.tertiary,
					themeTw.border.tint[tint],
					themeTw.ring.tint[tint]
				)}
				aria-invalid={hasError ? "true" : "false"}
				aria-errormessage={
					hasError ? `${props.id}-errormessage` : undefined
				}
				aria-placeholder={props.placeholder}
			/>
			<InputErrorMessage
				center={center}
				id={`${props.id}-errormessage`}
				visible={hasError}
			>
				{errors[field.name] as React.ReactNode}
			</InputErrorMessage>
		</div>
	)
}

export type TextFieldProps = TextInputProps & {
	name: React.ComponentPropsWithoutRef<typeof Field>["name"]
}

const TextField: React.FC<TextFieldProps> = props => {
	return <Field {...props} component={TextInput} />
}

export default TextField
