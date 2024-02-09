import { NumberField } from "@scientisst/react-ui/components/inputs"

const makerSettings = () => {
	
    return (
        <>
            <NumberField
                label="Baud Rate"
                name="baudRate"
                id="baudRate"
                min={0}
                max={16000}
                center
                className="w-full max-w-[29.25rem]"
            />
        </>
    )
}

export default makerSettings