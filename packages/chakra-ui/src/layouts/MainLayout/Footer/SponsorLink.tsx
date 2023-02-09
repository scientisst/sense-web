import NextLink from "next/link"

import { Link, LinkProps } from "@chakra-ui/react"

export type SponsorLinkProps = LinkProps &
	React.ComponentPropsWithoutRef<typeof NextLink>

const SponsorLink: React.FC<SponsorLinkProps> = ({ ...props }) => {
	return (
		<Link
			as={NextLink}
			_hover={{
				transform: "scale(1.05)"
			}}
			_active={{
				transform: "scale(0.95)"
			}}
			{...props}
		/>
	)
}

export default SponsorLink
