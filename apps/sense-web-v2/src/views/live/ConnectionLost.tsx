import { TextButton } from "@scientisst/react-ui/components/inputs"
import Link from "next/link"
import { STATUS } from "../../pages/live"

const ConnectionLost = ({connect, status}) => {
    return (
        <>
            <TextButton
                size={"base"}
                onClick={connect}
                disabled={status === STATUS.CONNECTING}
            >
                Connect
            </TextButton>

            <Link href="/summary">
                <TextButton size={"base"}>Download</TextButton>
            </Link>

            <span>Connection lost!</span>
        </>
    )
}

export default ConnectionLost;