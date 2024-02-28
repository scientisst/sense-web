import {
	faGear,
	faToolbox,
	faWaveSquare
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ImageRadioGroupField } from "@scientisst/react-ui/components/inputs"

const settingsTab = () => {
	return (
		<ImageRadioGroupField
			label="Device Type"
			id="deviceType"
			name="deviceType"
			center
			className="w-full max-w-[29.25rem]"
			options={[
				{
					name: "Sense",
					value: "sense",
					img: (
						<FontAwesomeIcon
							icon={faWaveSquare}
							className="h-16 w-16"
						/>
					)
				},
				{
					name: "Maker",
					value: "maker",
					img: (
						<FontAwesomeIcon
							icon={faToolbox}
							className="h-16 w-16"
						/>
					)
				},
				{
					name: "System",
					value: "system",
					// disabled: true,
					img: <FontAwesomeIcon icon={faGear} className="h-16 w-16" />
				}
			]}
		/>
	)
}

export default settingsTab
