import React, { useEffect, useRef, useState } from "react"

import { faToolbox, faWaveSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Field, FieldProps, useFormikContext } from "formik"

import joinClassNames from "../utils/joinClassNames"
import { tintTextClass } from "../utils/tints"
import InputErrorLabel from "./common/InputErrorLabel"
import InputLabel from "./common/InputLabel"

export interface DeviceSelectorInputProps {
	label?: string
	id: string
	center?: boolean
	name: React.ComponentPropsWithoutRef<typeof Field>["name"]
	className?: string
	style?: React.CSSProperties
}

type Devices = Array<{
	id: string
	name: string
	icon: React.ComponentPropsWithoutRef<typeof FontAwesomeIcon>["icon"]
}>

const devices: Devices = [
	{
		id: "sense",
		name: "Sense",
		icon: faWaveSquare
	},
	{
		id: "maker",
		name: "Maker",
		icon: faToolbox
	}
]

export const DeviceSelectorInput: React.FC<
	DeviceSelectorInputProps & FieldProps
> = ({
	field,
	form: { touched, errors },
	label,
	center,
	className,
	style,
	...props
}) => {
	const { setFieldValue } = useFormikContext()
	const radioRefs = useRef<Record<number, HTMLButtonElement>>({})
	const [inFocus, setInFocus] = useState(false)

	const hasError = !!(touched[field.name] && errors[field.name])
	const selectedIndex = devices.findIndex(device => device.id === field.value)

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

					const currentIndex = devices.findIndex(
						device => device.id === field.value
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
	}, [field.value, inFocus])

	return (
		<fieldset
			role="radiogroup"
			className={joinClassNames(
				"mb-4 flex flex-col items-stretch gap-2",
				className
			)}
			id={props.id}
			style={style}
		>
			<InputLabel center={center} htmlFor={props.id}>
				{label}
			</InputLabel>
			<div
				className={joinClassNames(
					"mx-[-1.5rem] flex items-center",
					center ? "self-center" : "self-start"
				)}
			>
				{devices.map((device, index) => (
					<button
						role="radio"
						ref={ref => {
							radioRefs.current[index] = ref
						}}
						aria-checked={selectedIndex === index}
						onClick={e => {
							e.preventDefault()
							setFieldValue(field.name, device.id)
						}}
						onKeyDown={e => {
							if (e.key === "Space") {
								e.preventDefault()
								if (field.value !== device.id) {
									setFieldValue(field.name, device.id)
								}
							} else if (e.key === "Enter") {
								e.preventDefault()
							} else if (
								e.key === "ArrowRight" ||
								e.key === "ArrowDown"
							) {
								e.preventDefault()

								const nextIndex = (index + 1) % devices.length
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
									(index - 1 + devices.length) %
									devices.length
								const previousRadio =
									radioRefs.current[previousIndex]
								if (previousRadio) {
									previousRadio.focus()
								}
							}
						}}
						key={device.name}
						id={`${props.id}-${device.id}`}
						className={joinClassNames(
							"flex flex-col items-center gap-2 py-4 px-6 font-medium uppercase motion-safe:hover:scale-hover motion-safe:active:scale-pressed",
							selectedIndex === index
								? tintTextClass["red"]
								: undefined
						)}
					>
						<FontAwesomeIcon
							icon={device.icon}
							className="h-16 w-16"
						/>
						<label htmlFor={`${props.id}-${device.id}`}>
							{device.name}
						</label>
					</button>
				))}
			</div>
			<InputErrorLabel
				center={center}
				id={`${props.id}-errormessage`}
				visible={hasError}
			>
				{errors[field.name] as React.ReactNode}
			</InputErrorLabel>
		</fieldset>
	)
}

const DeviceSelectorField: React.FC<DeviceSelectorInputProps> = props => {
	return <Field {...props} component={DeviceSelectorInput} />
}

export default DeviceSelectorField
