import Link from "next/link"

import ScientISSTSenseLogo from "../assets/logos/ScientISSTSenseLogo"
import ScientISSTSenseVerticalLogo from "../assets/logos/ScientISSTSenseVerticalLogo"
import TextButton from "../components/inputs/TextButton"
import SenseLayout from "../components/layout/SenseLayout"

const Page = () => {
	return (
		<SenseLayout
			className="flex w-[480px] flex-col items-center justify-center gap-8 py-8 px-8 sm:w-[640px]"
			header={false}
			style={{
				minHeight: "calc(100vh - 14.5rem)"
			}}
		>
			<ScientISSTSenseLogo className="hidden h-auto w-full sm:block" />
			<ScientISSTSenseVerticalLogo className="sm:hidden" />
			<div className="flex flex-col gap-8 self-stretch sm:flex-row">
				<Link href="/live">
					<TextButton tint="red" size="lg" className="flex-grow">
						Live
					</TextButton>
				</Link>
				<Link href="/settings">
					<TextButton tint="red" size="lg" className="flex-grow">
						Settings
					</TextButton>
				</Link>
			</div>
		</SenseLayout>
	)
}

export default Page
