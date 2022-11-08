import { useEffect, useState } from "react"

import TextButton from "../components/inputs/TextButton"
import SenseLayout from "../components/layout/SenseLayout"

const fakeTimeSeries: Array<{
	time: number
	voltage: number
}> = []
for (let i = 0; i < 1000 * 30; i++) {
	fakeTimeSeries.push({
		time: i / 1000,
		voltage: Math.sin(i / 1000) * 4098
	})
}

const Page = () => {
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		if (typeof window !== "undefined" && !loaded) {
			setLoaded(true)
		}
	}, [loaded])

	return (
		<SenseLayout
			className="container flex flex-col items-center justify-start gap-8 py-8 px-8"
			title="Live Acquisition"
			shortTitle="Live"
			returnHref="/"
			style={{
				minHeight: "calc(100vh - 18.5rem)"
			}}
		>
			<TextButton size="base">Connect</TextButton>
			<div className="h-[20rem] w-full"></div>
		</SenseLayout>
	)
}

export default Page
