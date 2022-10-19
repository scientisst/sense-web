import { useEffect, useRef, useState } from "react"

import { Field, FieldProps, useFormikContext } from "formik"

import joinClassNames from "../utils/joinClassNames"
import { tintBackgroundClass, tintBorderClass } from "../utils/tints"
import InputErrorLabel from "./common/InputErrorLabel"
import InputLabel from "./common/InputLabel"

interface ButtonSelectInputProps {
	label?: string
	id: string
	center?: boolean
	name: React.ComponentPropsWithoutRef<typeof Field>["name"]
	className?: string
	style?: React.CSSProperties
	options: Array<{
		name: string
		value: string
	}>
}

const ButtonSelectInput: React.FC<ButtonSelectInputProps & FieldProps> = ({
	field,
	form: { touched, errors },
	label,
	center,
	className,
	style,
	options,
	id
}) => {
	const { setFieldValue } = useFormikContext()
	const radioRefs = useRef<Record<number, HTMLButtonElement>>({})
	const [inFocus, setInFocus] = useState(false)

	const hasError = !!(touched[field.name] && errors[field.name])
	const selectedIndex = options.findIndex(
		option => option.value === field.value
	)

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
					const currentRadio = radioRefs.current[currentIndex]
					if (currentRadio) {
						currentRadio.focus()
					} else if (radioRefs.current[0]) {
						radioRefs.current[0].focus()
					}
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
		<fieldset
			role="radiogroup"
			className={joinClassNames(
				"mb-4 flex flex-col items-stretch gap-2",
				className
			)}
			style={style}
		>
			<InputLabel center={center} htmlFor={id}>
				{label}
			</InputLabel>
			<div
				className={joinClassNames(
					"flex justify-center rounded-lg border-[3px] bg-primary drop-shadow dark:bg-primary-dark",
					tintBorderClass["red"]
				)}
			>
				{options.map((option, index) => (
					<>
						{index !== 0 && (
							<div
								key={`divider-${index}`}
								className={joinClassNames(
									"w-[1px] opacity-50",
									tintBackgroundClass["red"]
								)}
							/>
						)}
						<button
							key={index}
							role="radio"
							ref={ref => {
								radioRefs.current[index] = ref
							}}
							className={joinClassNames(
								"flex-grow py-2 px-4 font-medium",
								selectedIndex === index
									? tintBackgroundClass["red"]
									: ""
							)}
							aria-checked={selectedIndex === index}
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
						>
							{option.name}
						</button>
					</>
				))}
			</div>
			<InputErrorLabel
				center={center}
				id={`${id}-errormessage`}
				visible={hasError}
			>
				{errors[field.name] as React.ReactNode}
			</InputErrorLabel>
		</fieldset>
	)
}

const ButtonSelectField: React.FC<ButtonSelectInputProps> = props => {
	return <Field {...props} component={ButtonSelectInput} />
}

export default ButtonSelectField
