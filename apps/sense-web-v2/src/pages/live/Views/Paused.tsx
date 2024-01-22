import { TextButton } from "@scientisst/react-ui/components/inputs"

const Paused = ({resume, stop}) => {
    return (
        <>
            <TextButton
                size={"base"}
                onClick={resume}
            >
                Resume
            </TextButton>
            <TextButton size={"base"} onClick={stop}>
                Stop
            </TextButton>
        </>
    )
}

export default Paused;