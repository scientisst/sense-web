import { TextButton } from "@scientisst/react-ui/components/inputs";
import Link from "next/link"

const OutOfStorage = () => {

    return (
        <>
            <Link href="/summary">
                <TextButton size={"base"}>Download</TextButton>
            </Link>

            <span>Ran out of local storage!</span>
        </>
    )
}

export default OutOfStorage;