import { useCallback, useState } from "react"

import Image from "next/future/image"

import { Field, FieldProps, useFormikContext } from "formik"
import { callbackify } from "util"

import CoreBottom from "../../assets/boards/core-bottom.svg"
import CoreTop from "../../assets/boards/core-top.svg"
import joinClassNames from "../utils/joinClassNames"
import {
	tintBackgroundClass,
	tintBorderClass,
	tintRingClass
} from "../utils/tints"
import InputErrorLabel from "./common/InputErrorLabel"
import InputLabel from "./common/InputLabel"

export interface ChannelSelectorInputProps {
	label?: string
	id: string
	name: React.ComponentPropsWithoutRef<typeof Field>["name"]
	className?: string
	style?: React.CSSProperties
}

type Channels = Array<{
	name: string
	value: string
}>

const channels: Channels = [
	{
		name: "1",
		value: "AI1"
	},
	{
		name: "2",
		value: "AI2"
	},
	{
		name: "3",
		value: "AI3"
	},
	{
		name: "4",
		value: "AI4"
	},
	{
		name: "5",
		value: "AI5"
	},
	{
		name: "6",
		value: "AI6"
	},
	{
		name: "Digital",
		value: "DI"
	}
]

const ChannelSelectorInput: React.FC<
	ChannelSelectorInputProps & FieldProps
> = ({
	field,
	form: { touched, errors },
	label,
	className,
	style,
	...props
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

	return (
		<div
			className={joinClassNames(
				"mb-4 flex flex-col items-center gap-2",
				className
			)}
			style={style}
		>
			<InputLabel center htmlFor={props.id}>
				{label}
			</InputLabel>
			<div className="flex max-w-[11rem] flex-wrap justify-center gap-4 sm:max-w-none">
				{channels.map((channel, index) => {
					const checked = isChecked(channel.value)

					return (
						<button
							role="checkbox"
							aria-checked={checked ? "true" : "false"}
							onMouseEnter={() => setHovered(channel.value)}
							onMouseLeave={() => setHovered("")}
							onClick={e => {
								e.preventDefault()
								toggleChannel(channel.value)
							}}
							onKeyDown={e => {
								if (e.key === "Enter") {
									e.preventDefault()
								} else if (e.key === "Space") {
									e.preventDefault()
									toggleChannel(channel.value)
								}
							}}
							key={index}
							id={`${props.id}-${index}`}
							className={joinClassNames(
								"flex h-12 min-w-[3rem] items-center justify-center rounded-full drop-shadow motion-safe:hover:scale-hover motion-safe:active:scale-pressed",
								"focus:outline-none focus:ring-[3px] focus:ring-opacity-30 dark:focus:ring-opacity-40",
								checked
									? tintBackgroundClass["red"]
									: "border-[3px] bg-primary dark:bg-primary-dark",
								tintBorderClass["red"],
								tintRingClass["red"]
							)}
							style={{
								padding: !checked
									? "0 calc(1rem - 3px)"
									: "0 1rem"
							}}
							aria-label={`Channel ${channel.name}`}
						>
							<label
								htmlFor={`${props.id}-${index}`}
								className="pointer-events-none"
							>
								{channel.name}
							</label>
						</button>
					)
				})}
			</div>
			<div className="hidden justify-center gap-8 sm:flex">
				<div className="relative flex flex-col items-center">
					<div
						className={joinClassNames(
							"absolute rounded-lg border-[3px]",
							tintBorderClass["red"],
							hovered === "AI1" ? "" : "hidden"
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "0.25rem",
							left: "0"
						}}
					/>
					<div
						className={joinClassNames(
							"absolute rounded-lg border-[3px]",
							tintBorderClass["red"],
							hovered === "AI3" ? "" : "hidden"
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "calc(4.75rem - 3px)",
							left: "0"
						}}
					/>
					<div
						className={joinClassNames(
							"absolute rounded-lg border-[3px]",
							tintBorderClass["red"],
							hovered === "AI5" ? "" : "hidden"
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "calc(4.75rem - 3px)",
							right: "0"
						}}
					/>
					<Image
						src={CoreTop}
						alt=""
						className="m-2"
						style={{
							maxWidth: "16rem",
							height: "auto"
						}}
					/>
					<span className="imagine-font text-2xl">Top</span>
				</div>
				<div className="relative flex flex-col items-center">
					<div
						className={joinClassNames(
							"absolute rounded-lg border-[3px]",
							tintBorderClass["red"],
							hovered === "AI2" ? "" : "hidden"
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "0.25rem",
							right: "0"
						}}
					/>
					<div
						className={joinClassNames(
							"absolute rounded-lg border-[3px]",
							tintBorderClass["red"],
							hovered === "AI6" ? "" : "hidden"
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "calc(4.75rem - 3px)",
							left: "0"
						}}
					/>
					<div
						className={joinClassNames(
							"absolute rounded-lg border-[3px]",
							tintBorderClass["red"],
							hovered === "AI4" ? "" : "hidden"
						)}
						style={{
							width: "4.5rem",
							height: "4.5rem",
							top: "calc(4.75rem - 3px)",
							right: "0"
						}}
					/>
					<Image
						src={CoreBottom}
						alt=""
						className="m-2"
						style={{
							maxWidth: "16rem",
							height: "auto"
						}}
					/>
					<span className="imagine-font text-2xl">Bottom</span>
				</div>
			</div>
			<InputErrorLabel
				center
				id={`${props.id}-errormessage`}
				visible={hasError}
			>
				{errors[field.name] as React.ReactNode}
			</InputErrorLabel>
		</div>
	)
}

const ChannelSelectorField: React.FC<ChannelSelectorInputProps> = props => {
	return <Field {...props} component={ChannelSelectorInput} />
}

export default ChannelSelectorField
