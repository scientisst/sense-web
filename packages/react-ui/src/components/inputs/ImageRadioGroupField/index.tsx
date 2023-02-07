import React, { useEffect, useRef, useState } from "react"

import clsx from "clsx"
import { Field, FieldProps, useFormikContext } from "formik"

import { InputErrorMessage, InputLabel } from "../common"

interface ImageRadioGroupProps {
	label?: string
	id: string
	center?: boolean
	className?: string
	style?: React.CSSProperties
	options: Array<{
		img: React.ReactNode
		name: string
		value: string
		ariaLabel?: string
	}>
}

const ImageRadioGroup: React.FC<ImageRadioGroupProps & FieldProps> = ({
	field,
	form: { touched, errors },
	label,
	center,
	className,
	style,
	id,
	options
}) => {
	const { setFieldValue } = useFormikContext()
	const radioRefs = useRef<Record<number, HTMLButtonElement | null>>({})
	const [inFocus, setInFocus] = useState(false)
	const hasError = !!(touched[field.name] && errors[field.name])

	useEffect(() => {
		const onFocusListener = (e: FocusEvent) => {
			if (
				Object.values(radioRefs.current).includes(
					document.activeElement as HTMLButtonElement
				)
			) {
				if (!inFocus) {
					e.preventDefault()
					setInFocus(true)

					const currentIndex = options.findIndex(
						option => option.value === field.value
					)
					radioRefs.current[
						currentIndex !== -1 ? currentIndex : 0
					]?.focus()
				}
			} else {
				setInFocus(false)
			}
		}

		addEventListener("focusin", onFocusListener)

		return () => {
			removeEventListener("focusin", onFocusListener)
		}
	}, [field.value, inFocus, options])

	return (
		<div
			role="radiogroup"
			id={id}
			className={clsx(
				"mb-4 flex flex-col items-stretch gap-2",
				className
			)}
			style={style}
			aria-invalid={hasError ? "true" : "false"}
			aria-errormessage={hasError ? `${id}-errormessage` : undefined}
		>
			<InputLabel center={center} htmlFor={id}>
				{label}
			</InputLabel>
			<div
				className={clsx(
					"flex w-full flex-wrap items-center",
					center ? "justify-center" : "mx-[-1.5rem] justify-start"
				)}
			>
				{options.map((option, index) => (
					<button
						role="radio"
						key={option.value}
						id={`${id}-${option.value}`}
						name={field.name}
						ref={ref => {
							radioRefs.current[index] = ref
						}}
						onClick={e => {
							e.preventDefault()
							setFieldValue(field.name, option.value)
						}}
						onKeyDown={e => {
							if (e.key === "Space") {
								e.preventDefault()
								if (field.value !== option.value) {
									setFieldValue(field.name, option.value)
								}
							} else if (e.key === "Enter") {
								e.preventDefault()
							} else if (
								e.key === "ArrowRight" ||
								e.key === "ArrowDown"
							) {
								e.preventDefault()

								const nextIndex = (index + 1) % options.length
								const nextRadio = radioRefs.current[nextIndex]
								if (nextRadio) {
									nextRadio.focus()
								}
							} else if (
								e.key === "ArrowLeft" ||
								e.key === "ArrowUp"
							) {
								e.preventDefault()

								const previousIndex =
									(index - 1 + options.length) %
									options.length
								const previousRadio =
									radioRefs.current[previousIndex]
								if (previousRadio) {
									previousRadio.focus()
								}
							}
						}}
						className={clsx(
							"flex flex-col items-center gap-2 py-4 px-6 font-medium uppercase motion-safe:hover:scale-hover motion-safe:active:scale-pressed",
							{
								["text-primary"]: field.value === option.value
							}
						)}
						aria-checked={field.value === option.value}
						aria-label={option.ariaLabel}
					>
						{option.img}
						<label htmlFor={`${id}-${option.value}`}>
							{option.name}
						</label>
					</button>
				))}
			</div>
			<InputErrorMessage
				center={center}
				id={`${id}-errormessage`}
				visible={hasError}
			>
				{errors[field.name] as React.ReactNode}
			</InputErrorMessage>
		</div>
	)
}

export type ImageRadioGroupFieldProps = ImageRadioGroupProps & {
	name: React.ComponentPropsWithoutRef<typeof Field>["name"]
}

const ImageRadioGroupField: React.FC<ImageRadioGroupFieldProps> = props => {
	return <Field {...props} component={ImageRadioGroup} />
}

export default ImageRadioGroupField
