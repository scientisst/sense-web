import Link from "next/link"

import clsx from "clsx"

import { themeTw } from "../../../styles/theme"

export interface FooterLinkSectionProps {
	title: React.ReactNode
	links: Array<{
		href: React.ComponentPropsWithoutRef<typeof Link>["href"]
		label: React.ReactNode
	}>
	className?: string
	style?: React.CSSProperties
}

const FooterLinkSection: React.FC<FooterLinkSectionProps> = ({
	title,
	links,
	className,
	style
}) => {
	return (
		<div
			className={clsx(
				"mt-[-0.75rem] flex flex-col items-start gap-2",
				className
			)}
			style={style}
		>
			<h4 className="imagine-font mb-2 text-2xl">{title}</h4>
			{links.map(({ href, label }, index) => (
				<Link key={index} href={href}>
					<a
						className={clsx(
							"motion-safe:hover:scale-hover motion-safe:active:scale-pressed",
							themeTw.text.textOver.tint["red"]
						)}
					>
						{label}
					</a>
				</Link>
			))}
		</div>
	)
}

export default FooterLinkSection
