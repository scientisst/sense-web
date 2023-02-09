import { ReactNode } from "react"

import { Container, Flex, chakra } from "@chakra-ui/react"

import SponsorLink from "./SponsorLink"

export interface SponsorLink {
	href: string
	img: ReactNode
	ariaLabel?: string
}

export interface FooterProps {
	sponsors?: SponsorLink[]
}

const Footer: React.FC<FooterProps> = ({ sponsors }) => {
	return (
		<chakra.footer
			shadow="md"
			color="white"
			bg="scientisst.red.dark"
			_dark={{
				bg: "scientisst.red.light"
			}}
		>
			<Container
				as={Flex}
				paddingTop="8"
				paddingBottom="8"
				paddingLeft="4"
				paddingRight="4"
				flexDirection="row"
				justifyContent="space-between"
				maxW={[
					null,
					"container.sm",
					"container.md",
					"container.lg",
					"container.xl",
					"container.2xl"
				]}
				paddingX="0"
			>
				<Flex>asd</Flex>
				{sponsors && (
					<Flex direction="column" gap="4" padding="4">
						{sponsors.map(({ href, img, ariaLabel }, index) => (
							<SponsorLink
								key={index}
								href={href}
								aria-label={ariaLabel}
							>
								{img}
							</SponsorLink>
						))}
					</Flex>
				)}
			</Container>
		</chakra.footer>
	)
}

export default Footer
