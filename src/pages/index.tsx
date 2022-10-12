import Link from "next/link"

import ScientISSTSENSE from "../assets/logos/ScientISSTSENSE.svg"
import ScientISSTSENSEVertical from "../assets/logos/ScientISSTSENSEVertical.svg"
import CenteredLayout from "../components/layout/CenteredLayout"

interface NavButtonProps {
	children?: React.ReactNode
	href: React.ComponentPropsWithoutRef<typeof Link>["href"]
}

const NavButton: React.FC<NavButtonProps> = ({ children, href }) => {
	return (
		<Link href={href}>
			<button className="flex flex-grow flex-col items-center rounded-lg bg-tint-red py-4 px-8 text-lg font-medium uppercase text-primary-white hover:bg-tint-red-dark">
				{children}
			</button>
		</Link>
	)
}

const Page = () => {
	return (
		<CenteredLayout className="flex w-[360px] flex-col items-center gap-12 px-4 py-8 sm:w-auto">
			<ScientISSTSENSE className="hidden sm:block" />
			<ScientISSTSENSEVertical className="sm:hidden" />
			<div className="flex flex-col gap-4 self-stretch sm:flex-row">
				<NavButton href="/live">Live</NavButton>
				<NavButton href="/settings">Settings</NavButton>
			</div>
		</CenteredLayout>
	)
}

export default Page
