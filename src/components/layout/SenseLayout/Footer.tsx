import React from "react"

import {
	faFacebook,
	faGithub,
	faInstagram,
	faLinkedin,
	faStackOverflow
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ImageAnchor } from "@scientisst/react-ui/components/navigation"

import ItLogo from "../../../assets/logos/ItLogo"
import ScientISSTLogo from "../../../assets/logos/ScientISSTLogo"
import ScientISSTSenseLogo from "../../../assets/logos/ScientISSTSenseLogo"
import TecnicoLogo from "../../../assets/logos/TecnicoLogo"
import FooterLinkSection from "./FooterLinkSection"

type FooterSections = Array<{
	title: React.ComponentPropsWithoutRef<typeof FooterLinkSection>["title"]
	links: React.ComponentPropsWithoutRef<typeof FooterLinkSection>["links"]
}>

const footerSections: FooterSections = [
	{
		title: "Sense",
		links: [
			,
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
	},
	{
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
	},
	{
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
	}
]

type SocialMediaLinks = Array<{
	href: React.ComponentPropsWithoutRef<typeof ImageAnchor>["href"]
	icon: React.ComponentPropsWithoutRef<typeof FontAwesomeIcon>["icon"]
	ariaLabel: React.ComponentPropsWithoutRef<typeof ImageAnchor>["ariaLabel"]
}>

const socialMediaLinks: SocialMediaLinks = [
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
]

type FooterSponsors = Array<{
	href: React.ComponentPropsWithoutRef<typeof ImageAnchor>["href"]
	img: React.ComponentPropsWithoutRef<typeof ImageAnchor>["children"]
	ariaLabel?: React.ComponentPropsWithoutRef<typeof ImageAnchor>["ariaLabel"]
}>

const footerSponsors: FooterSponsors = [
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
]

const Footer = () => {
	return (
		<footer className="container flex flex-col p-8 pb-4">
			<div className="flex flex-col items-start justify-between gap-12 sm:flex-row sm:gap-8">
				<div className="flex max-w-[21rem] flex-col items-start gap-4">
					<ScientISSTSenseLogo monochrome className="h-20 w-auto" />
					<p className="text-lg font-medium">
						Biomedical engineering for everyone.
					</p>
					<div className="m-[-0.5rem] flex">
						{socialMediaLinks.map(
							({ href, icon, ariaLabel }, index) => (
								<ImageAnchor
									key={index}
									href={href}
									ariaLabel={ariaLabel}
								>
									<FontAwesomeIcon
										icon={icon}
										className="h-8 w-8 p-2"
									/>
								</ImageAnchor>
							)
						)}
					</div>
				</div>
				{footerSections.map((section, index) => (
					<FooterLinkSection
						key={index}
						title={section.title}
						links={section.links}
						className="flex sm:hidden xl:flex"
					/>
				))}
				<div className="flex flex-col items-start gap-4">
					{footerSponsors.map(({ href, img, ariaLabel }, index) => (
						<ImageAnchor
							key={index}
							href={href}
							ariaLabel={ariaLabel}
						>
							{img}
						</ImageAnchor>
					))}
				</div>
			</div>
			<div className="text-over-primary-highest my-8 hidden border-t opacity-50 sm:block xl:hidden" />
			<div className="hidden items-start justify-between gap-8 sm:flex xl:hidden">
				{footerSections.map((section, index) => (
					<FooterLinkSection
						key={index}
						title={section.title}
						links={section.links}
					/>
				))}
			</div>
			<div className="border-over-primary mt-8 mb-2 border-t opacity-50" />
			<div className="text-secondary-white flex flex-col items-center">
				<span className="imagine-font mt--2 text-center text-2xl">
					{/* TODO: Automatically retrieve the version */}
					VERSION 0.6.0
				</span>
				<span className="text-center text-lg font-medium">
					© {new Date().getFullYear()} ScientISST. All rights
					reserved.
				</span>
			</div>
		</footer>
	)
}

export default Footer
