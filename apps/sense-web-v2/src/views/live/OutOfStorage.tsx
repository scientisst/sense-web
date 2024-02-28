import Link from "next/link"

import { TextButton } from "@scientisst/react-ui/components/inputs"

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

export default OutOfStorage
