import { Container, Flex, chakra } from "@chakra-ui/react"

const Nav: React.FC = () => {
	// const isDesktop = useBreakpointValue({ base: false, lg: true })
	// const { colorMode, toggleColorMode } = useColorMode()

	return (
		<chakra.nav
			top="0"
			left="0"
			right="0"
			position="sticky"
			zIndex="sticky"
			color="white"
			bg="scientisst.red.dark"
			_dark={{
				bg: "scientisst.red.light"
			}}
		>
			<Container
				as={Flex}
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				maxW="container.xl"
				paddingX="0"
			>
				<div>Placeholder</div>
			</Container>
		</chakra.nav>
	)
}

export default Nav
