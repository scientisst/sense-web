import Link from "next/link"

import joinClassNames from "../../utils/joinClassNames"

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
			className={joinClassNames(
				"mt-[-0.75rem] flex flex-col items-start gap-2",
				className
			)}
			style={style}
		>
			<h4 className="imagine-font mb-2 text-2xl">{title}</h4>
			{links.map(({ href, label }, index) => (
				<Link key={index} href={href}>
					<a className="text-secondary-white motion-safe:hover:scale-hover motion-safe:active:scale-pressed">
						{label}
					</a>
				</Link>
			))}
		</div>
	)
}

export default FooterLinkSection
