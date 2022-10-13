import Link from "next/link"

import ScientISSTSenseLogo from "../assets/logos/ScientISSTSenseLogo"
import ScientISSTSenseVerticalLogo from "../assets/logos/ScientISSTSenseVerticalLogo"
import TextButton from "../components/inputs/TextButton"
import CenteredLayout from "../components/layout/CenteredLayout"

const Page = () => {
	return (
		<CenteredLayout className="flex w-[360px] flex-col items-center gap-12 px-4 py-8 sm:w-auto">
			<ScientISSTSenseLogo className="hidden sm:block" />
			<ScientISSTSenseVerticalLogo className="sm:hidden" />
			<div className="flex flex-col gap-4 self-stretch sm:flex-row">
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
		</CenteredLayout>
	)
}

export default Page
