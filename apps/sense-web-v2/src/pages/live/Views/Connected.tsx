import { TextButton } from "@scientisst/react-ui/components/inputs"

const Connected = ({firmwareVersion, start, disconnect}) => {
    return (
        <>
            {firmwareVersion !== null && (<span>Firmware Version: {firmwareVersion}</span>)}

            <TextButton size={"base"} onClick={start}>
                Start
            </TextButton>
            <TextButton size={"base"} onClick={disconnect}>
                Disconnect
            </TextButton>
        </>
    )
}

export default Connected;