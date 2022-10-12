import Link from "next/link"

export interface SponsorLogoButtonProps {
	href: React.ComponentPropsWithoutRef<typeof Link>["href"]
	children: React.ReactNode
}

const SponsorLogoButton: React.FC<SponsorLogoButtonProps> = ({
	href,
	children
}) => {
	return (
		<Link href={href}>
			<a className="leading-none hover:text-secondary-white">
				{children}
			</a>
		</Link>
	)
}

export default SponsorLogoButton
