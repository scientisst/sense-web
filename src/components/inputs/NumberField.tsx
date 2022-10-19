import React from "react"

import { Field, FieldProps } from "formik"

import joinClassNames from "../utils/joinClassNames"
import { TintColor, tintToClassName } from "../utils/tints"
import InputErrorMessage from "./common/InputErrorMessage"
import InputLabel from "./common/InputLabel"

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
	tint: TintColor
}

const NumberInput: React.FC<NumberInputProps & FieldProps> = ({
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
				type="number"
				className={joinClassNames(
					"h-12 rounded-lg border-3 bg-primary px-4 drop-shadow dark:bg-primary-dark",
					"focus:outline-none focus:ring-3 focus:ring-opacity-30 dark:focus:ring-opacity-40",
					"text-secondary-black placeholder:text-tertiary-black dark:text-secondary-white dark:placeholder:text-tertiary-white",
					tintToClassName["border"][tint],
					tintToClassName["ring"][tint]
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
