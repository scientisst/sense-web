import { Box, IconButton } from "@chakra-ui/react"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	ButtonRadioGroupField,
	TextButton,
	TextField
} from "@scientisst/react-ui/components/inputs"
import { Field, FieldArray } from "formik"

import { eventProps } from "../../utils/constants"

const colors = [
	"rgb(255, 0, 0)",
	"rgb(0, 255, 0)",
	"rgb(0, 0, 255)",
	"rgb(255, 255, 0)",
	"rgb(255, 0, 255)",
	"rgb(0, 255, 255)",
	"rgb(128, 128, 128)",
	"rgb(255, 165, 0)",
	"rgb(0, 128, 0)",
	"rgb(128, 0, 128)",
	"rgb(255, 192, 203)"
]

const convertRgbToHex = rgb => {
	const [r, g, b] = rgb.match(/\d+/g)

	// Convert RGB to hexadecimal
	const hexR = parseInt(r).toString(16).padStart(2, "0")
	const hexG = parseInt(g).toString(16).padStart(2, "0")
	const hexB = parseInt(b).toString(16).padStart(2, "0")

	const hex = `#${hexR}${hexG}${hexB}`

	return hex
}

const convertHexToRgb = hex => {
	const r = parseInt(hex.substring(1, 3), 16)
	const g = parseInt(hex.substring(3, 5), 16)
	const b = parseInt(hex.substring(5, 7), 16)

	return `rgb(${r}, ${g}, ${b})`
}

const selectColor = eventsLabel => {
	// Extract existing colors from eventsLabel array
	const existingColors = eventsLabel.map(event => event.color)

	console.log("colors", existingColors)

	// Find the first color that is not in the existingColors array
	const availableColor = colors.find(color => !existingColors.includes(color))

	console.log("availableColor", availableColor)

	// Return the available color or fallback to a default color if all colors are taken
	return availableColor || colors[0]
}

const newEvent: (eventsLabel: eventProps[]) => eventProps = eventsLabel => {
	return {
		name: "new event",
		color: selectColor(eventsLabel),
		key: "n",
		toggle: "false"
	}
}

const EventsTable = ({ events, remove }) => {
	return (
		<div>
			{events.map((event, index) => (
				<Box
					key={index}
					display="flex"
					alignItems="center"
					marginBottom="1rem"
				>
					<TextField
						style={{ marginRight: "1rem" }}
						label="Name"
						name={`eventsLabel[${index}].name`}
						id={`eventsLabel[${index}].name`}
					/>

					<TextField
						style={{ marginRight: "1rem" }}
						label="Key"
						name={`eventsLabel[${index}].key`}
						id={`eventsLabel[${index}].key`}
						className="w-12"
					/>

					<ButtonRadioGroupField
						label="Toggle"
						style={{ width: "130px", marginRight: "1rem" }}
						name={`eventsLabel[${index}].toggle`}
						id={`eventsLabel[${index}].toggle`}
						options={[
							{
								name: "Yes",
								value: "true"
							},
							{
								name: "No",
								value: "false"
							}
						]}
						className="w-full max-w-[29.25rem]"
					/>

					<Field name={`eventsLabel[${index}].color`}>
						{({ field, form }) => (
							<>
								<input
									type="color"
									value={convertRgbToHex(field.value)}
									onChange={event => {
										form.setFieldValue(
											field.name,
											convertHexToRgb(event.target.value)
										)
									}}
									style={{
										marginTop: "1.5rem",
										width: "54px",
										height: "54px",
										cursor: "pointer",
										border: "none",
										outline: "none",
										backgroundColor: "transparent",
										marginRight: "1rem"
									}}
								/>
							</>
						)}
					</Field>

					<IconButton
						mt={5}
						onClick={() => remove(index)}
						icon={
							<FontAwesomeIcon
								icon={faTrash}
								className="h-6 w-6"
							/>
						}
						aria-label="Delete"
						_hover={{ color: "#F05463", transform: "scale(1.2)" }} // Increase size by 10%
						variant="ghost"
						boxShadow="none" // Remove the shadow
					/>
				</Box>
			))}
		</div>
	)
}

const systemSettings = () => {
	return (
		<>
			<FieldArray name="eventsLabel">
				{({ form, push, remove }) => {
					const { values } = form
					const { eventsLabel } = values

					return (
						<>
							<Box mb={5}>
								<EventsTable
									events={eventsLabel}
									remove={remove}
								/>
							</Box>

							<TextButton
								size={"base"}
								onClick={() => push(newEvent(eventsLabel))}
							>
								Create event
							</TextButton>
						</>
					)
				}}
			</FieldArray>
		</>
	)
}

export default systemSettings
