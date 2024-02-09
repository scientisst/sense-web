import { TextButton } from "@scientisst/react-ui/components/inputs"

const Paused = ({resume, stop}) => {
    return (
        <div className="flex flex-row gap-4">
            <TextButton size={"base"} onClick={resume}>
                Resume
            </TextButton>

            <TextButton size={"base"} onClick={stop}>
                Stop
            </TextButton>
        </div>
    )
}

export default Paused;