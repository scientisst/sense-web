import { TextButton } from "@scientisst/react-ui/components/inputs"
import { STATUS } from "../"

const Disconnect = ({ status, connect }) => {
    return (
        <div className="flex flex-row gap-4">
            <TextButton
                size={"base"}
                onClick={connect}
                disabled={status === STATUS.CONNECTING}
            >
                Connect
            </TextButton>
        </div>
    )
    
}

export default Disconnect;