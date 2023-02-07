import React from "react"

import clsx from "clsx"
import { Field, FieldProps } from "formik"

import { InputErrorMessage, InputLabel } from "../common"

interface NumberInputProps {
	label?: string
	placeholder?: string
	id: string
	/* Whether the label and error message should be centered or not */
	center?: boolean
	name: React.ComponentPropsWithoutRef<typeof Field>["name"]
	className?: string
	style?: React.CSSProperties
	min?: number
	max?: number
	step?: number
}

const NumberInput: React.FC<NumberInputProps & FieldProps> = ({
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
				type="number"
				className={clsx(
					"h-12 rounded-lg border-3 px-4 drop-shadow",
					"ring-primary focus:outline-none focus:ring-3 focus:ring-opacity-30 dark:focus:ring-opacity-40",
					"border-primary bg-background text-over-background-high placeholder:text-over-background-medium"
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

export type NumberFieldProps = NumberInputProps & {
	name: React.ComponentPropsWithoutRef<typeof Field>["name"]
}

const NumberField: React.FC<NumberFieldProps> = props => {
	return <Field {...props} component={NumberInput} />
}

export default NumberField
