import { TextButton } from "@scientisst/react-ui/components/inputs"
import { STATUS } from "../"

const ConnectionFailed = ({ status, connect }) => {
    return (
        <>
            <div className="flex flex-row gap-4">
                <TextButton
                    size={"base"}
                    onClick={connect}
                    disabled={status === STATUS.CONNECTING}
                >
                    Connect
                </TextButton>
            </div>
			
            <span>Connection failed!</span>
        </>
        
    )
    
}

export default ConnectionFailed;