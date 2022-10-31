import { Fragment, useEffect, useRef, useState } from "react"

import clsx from "clsx"
import { Field, FieldProps, useFormikContext } from "formik"

import { TintColor, themeTw } from "../../styles/theme"
import InputErrorMessage from "./common/InputErrorMessage"
import InputLabel from "./common/InputLabel"

interface ButtonRadioGroupProps {
	label?: string
	id: string
	center?: boolean
	className?: string
	style?: React.CSSProperties
	options: Array<{
		name: string
		value: string
		ariaLabel?: string
	}>
	tint: TintColor
}

const ButtonRadioGroup: React.FC<ButtonRadioGroupProps & FieldProps> = ({
	field,
	form: { touched, errors },
	label,
	center,
	className,
	style,
	options,
	id,
	tint
}) => {
	const { setFieldValue } = useFormikContext()
	const radioRefs = useRef<Record<number, HTMLButtonElement>>({})
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
					"flex h-12 justify-center rounded-lg border-3 drop-shadow",
					themeTw.background.background.primary,
					themeTw.text.textOver.background.primary,
					themeTw.border.tint[tint]
				)}
			>
				{options.map((option, index) => (
					<Fragment key={option.value}>
						{index !== 0 && (
							<div
								className={clsx(
									"w-[1px] opacity-50",
									themeTw.background.tint[tint]
								)}
							/>
						)}
						<button
							role="radio"
							ref={ref => {
								radioRefs.current[index] = ref
							}}
							id={`${id}-${option.value}`}
							name={field.name}
							className={clsx(
								"flex flex-grow items-center justify-center py-2 px-4 font-medium",
								{
									[themeTw.background.tint[tint]]:
										field.value === option.value,
									[themeTw.text.textOver.tint[tint].primary]:
										field.value === option.value
								}
							)}
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

									const nextIndex =
										(index + 1) % options.length
									const nextRadio =
										radioRefs.current[nextIndex]
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
							aria-checked={field.value === option.value}
							aria-label={option.ariaLabel}
						>
							<label
								htmlFor={`${id}-${option.value}`}
								className="pointer-events-none select-none"
							>
								{option.name}
							</label>
						</button>
					</Fragment>
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

export type ButtonRadioGroupFieldProps = ButtonRadioGroupProps & {
	name: React.ComponentPropsWithoutRef<typeof Field>["name"]
}

const ButtonRadioGroupField: React.FC<ButtonRadioGroupFieldProps> = props => {
	return <Field {...props} component={ButtonRadioGroup} />
}

export default ButtonRadioGroupField
