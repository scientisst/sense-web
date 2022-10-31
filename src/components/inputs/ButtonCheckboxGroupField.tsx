import { useCallback, useState } from "react"

import clsx from "clsx"
import { Field, FieldProps, useFormikContext } from "formik"

import { TintColor, themeTw } from "../../styles/theme"
import InputErrorMessage from "./common/InputErrorMessage"
import InputLabel from "./common/InputLabel"

interface ButtonCheckboxGroupProps {
	label?: string
	id: string
	className?: string
	style?: React.CSSProperties
	center?: boolean
	options: Array<{
		name: string
		value: string
		ariaLabel?: string
	}>
	tint: TintColor
	image?: (hovered: string) => React.ReactNode
}

const ButtonCheckboxGroup: React.FC<ButtonCheckboxGroupProps & FieldProps> = ({
	field,
	form: { touched, errors },
	label,
	className,
	style,
	options,
	id,
	center,
	image,
	tint
}) => {
	const [hovered, setHovered] = useState<string>("")
	const { setFieldValue } = useFormikContext()
	const hasError = !!(touched[field.name] && errors[field.name])

	const isChecked = useCallback(
		(channelValue: string) => {
			return (
				Array.isArray(field.value) && field.value.includes(channelValue)
			)
		},
		[field.value]
	)

	const toggleChannel = useCallback(
		(channelValue: string) => {
			if (isChecked(channelValue)) {
				setFieldValue(
					field.name,
					field.value.filter(
						(value: unknown) => value !== channelValue
					)
				)
			} else {
				const previousValues = Array.isArray(field.value)
					? field.value
					: []

				setFieldValue(field.name, [
					...(previousValues as string[]),
					channelValue
				])
			}
		},
		[field.name, field.value, isChecked, setFieldValue]
	)

	const renderedChildren = image?.(hovered)

	return (
		<div
			className={clsx(
				"mb-4 flex flex-col items-stretch gap-2",
				className
			)}
			style={style}
		>
			<InputLabel center={center} htmlFor={id}>
				{label}
			</InputLabel>
			<div
				className={clsx(
					"flex max-w-[11rem] flex-wrap gap-4 sm:max-w-none",
					center ? "justify-center" : "justify-start"
				)}
			>
				{options.map((option, index) => {
					const checked = isChecked(option.value)

					return (
						<button
							role="checkbox"
							name={field.name}
							onMouseEnter={() => setHovered(option.value)}
							onMouseLeave={() => setHovered("")}
							onClick={e => {
								e.preventDefault()
								toggleChannel(option.value)
							}}
							onKeyDown={e => {
								if (e.key === "Enter") {
									e.preventDefault()
								} else if (e.key === "Space") {
									e.preventDefault()
									toggleChannel(option.value)
								}
							}}
							key={index}
							id={`${id}-${index}`}
							className={clsx(
								"flex h-12 min-w-[3rem] items-center justify-center rounded-full drop-shadow",
								"motion-safe:hover:scale-hover motion-safe:hover:drop-shadow-md motion-safe:active:scale-pressed motion-safe:active:drop-shadow-sm",
								"focus:outline-none focus:ring-[3px] focus:ring-opacity-30 dark:focus:ring-opacity-40",
								themeTw.ring.tint[tint],
								{
									[themeTw.background.tint[tint]]: checked,
									[themeTw.text.textOver.tint[tint].primary]:
										checked,
									["border-3"]: !checked,
									[themeTw.border.tint[tint]]: !checked,
									[themeTw.background.background.primary]:
										!checked,
									[themeTw.text.textOver.background.primary]:
										!checked
								}
							)}
							style={{
								padding: !checked
									? "0 calc(1rem - 3px)"
									: "0 1rem"
							}}
							aria-checked={checked ? "true" : "false"}
							aria-invalid={hasError ? "true" : "false"}
							aria-errormessage={
								hasError ? `${id}-errormessage` : undefined
							}
							aria-label={option.ariaLabel}
						>
							<label
								htmlFor={`${id}-${index}`}
								className="pointer-events-none select-none"
							>
								{option.name}
							</label>
						</button>
					)
				})}
			</div>
			{renderedChildren && (
				<div
					className={clsx(
						"flex flex-col gap-2",
						center ? "items-center" : "items-start"
					)}
				>
					{renderedChildren}
				</div>
			)}
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

export type ButtonCheckboxGroupFieldProps = ButtonCheckboxGroupProps & {
	name: React.ComponentPropsWithoutRef<typeof Field>["name"]
}

const ButtonCheckboxGroupField: React.FC<
	ButtonCheckboxGroupFieldProps
> = props => {
	return <Field {...props} component={ButtonCheckboxGroup} />
}

export default ButtonCheckboxGroupField
