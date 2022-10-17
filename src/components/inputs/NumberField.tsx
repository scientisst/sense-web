import React from "react"

import { Field, FieldProps } from "formik"

import joinClassNames from "../utils/joinClassNames"
import { tintBorderClass } from "../utils/tints"
import InputErrorLabel from "./common/InputErrorLabel"
import InputLabel from "./common/InputLabel"

export interface NumberFieldProps {
	label?: string
	placeholder?: string
	id: string
	center?: boolean
	name: React.ComponentPropsWithoutRef<typeof Field>["name"]
	min?: number
	max?: number
	step?: number
}

// TODO: Hide the number input's spin buttons
const NumberInput: React.FC<NumberFieldProps & FieldProps> = ({
	field,
	form: { touched, errors },
	label,
	center = false,
	...props
}) => {
	const hasError = !!(touched[field.name] && errors[field.name])

	return (
		<div
			className={joinClassNames("mb-4 flex flex-col items-stretch gap-2")}
		>
			<InputLabel center={center} htmlFor={props.id}>
				{label}
			</InputLabel>
			<input
				{...field}
				{...props}
				type="number"
				className={joinClassNames(
					"rounded-lg border-[3px] bg-primary py-2 px-4 drop-shadow-xl focus:ring-[3px] dark:bg-primary-dark",
					"focus:outline-none focus:ring-tint-red focus:ring-opacity-30 dark:focus:ring-tint-red-dark dark:focus:ring-opacity-40",
					"text-secondary-black placeholder:text-tertiary-black dark:text-secondary-white dark:placeholder:text-tertiary-white",
					tintBorderClass["red"]
				)}
				aria-invalid={hasError ? "true" : "false"}
				aria-errormessage={
					hasError ? `${props.id}-errormessage` : undefined
				}
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

const NumberField: React.FC<NumberFieldProps> = props => {
	return <Field {...props} component={NumberInput} />
}

export default NumberField
