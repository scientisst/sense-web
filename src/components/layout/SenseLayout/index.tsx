import React from "react"

import {
	faFacebook,
	faGithub,
	faInstagram,
	faLinkedin,
	faStackOverflow
} from "@fortawesome/free-brands-svg-icons"
import { HeaderAndFooterLayout } from "@scientisst/react-ui/components/layouts"

import ItLogo from "../../../assets/logos/ItLogo"
import ScientISSTLogo from "../../../assets/logos/ScientISSTLogo"
import ScientISSTSenseLogo from "../../../assets/logos/ScientISSTSenseLogo"
import SenseLogo from "../../../assets/logos/SenseLogo"
import TecnicoLogo from "../../../assets/logos/TecnicoLogo"

export interface SenseLayoutProps {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
	title?: React.ComponentPropsWithoutRef<
		typeof HeaderAndFooterLayout
	>["title"]
	shortTitle?: React.ComponentPropsWithoutRef<
		typeof HeaderAndFooterLayout
	>["shortTitle"]
	returnHref?: React.ComponentPropsWithoutRef<
		typeof HeaderAndFooterLayout
	>["returnHref"]
}

const SenseLayout: React.FC<SenseLayoutProps> = ({ children, ...props }) => {
	return (
		<HeaderAndFooterLayout
			headerLogo={<SenseLogo className="h-full w-full p-2" />}
			footerLogo={
				<ScientISSTSenseLogo monochrome className="h-20 w-auto" />
			}
			motto="Biomedical engineering for everyone."
			socialMediaLinks={[
				{
					href: "https://www.facebook.com/scientisst",
					icon: faFacebook,
					ariaLabel: "Facebook"
				},
				{
					href: "https://www.instagram.com/scientissthub",
					icon: faInstagram,
					ariaLabel: "Instagram"
				},
				{
					href: "https://www.linkedin.com/company/scientisst",
					icon: faLinkedin,
					ariaLabel: "LinkedIn"
				},
				{
					href: "https://github.com/scientisst",
					icon: faGithub,
					ariaLabel: "GitHub"
				},
				{
					href: "https://stackoverflow.com/c/scientisst/questions",
					icon: faStackOverflow,
					ariaLabel: "Stack Overflow"
				}
			]}
			sectionA={{
				title: "Sense",
				links: [
					{
						href: "/",
						label: "Hardware"
					},
					{
						href: "/",
						label: "SENSE Desktop"
					},
					{
						href: "/",
						label: "SENSE Mobile"
					}
				]
			}}
			sectionB={{
				title: "Resources",
				links: [
					{
						href: "/",
						label: "Notebooks"
					},
					{
						href: "/",
						label: "FAQ"
					},
					{
						href: "/",
						label: "APIs"
					}
				]
			}}
			sectionC={{
				title: "ScientISST",
				links: [
					{
						href: "/",
						label: "About us"
					},
					{
						href: "/",
						label: "Join us"
					},
					{
						href: "/",
						label: "Contact us"
					}
				]
			}}
			sponsorLinks={[
				{
					href: "https://scientisst.com",
					img: <ScientISSTLogo />
				},
				{
					href: "https://it.pt",
					img: <ItLogo />
				},
				{
					href: "https://tecnico.ulisboa.pt",
					img: <TecnicoLogo />
				}
			]}
			{...props}
		>
			{children}
		</HeaderAndFooterLayout>
	)
}

export default SenseLayout
