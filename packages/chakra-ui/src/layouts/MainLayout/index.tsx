import { Flex, chakra } from "@chakra-ui/react"

import Footer, { FooterProps } from "./Footer"
import Nav from "./Nav"

export type MainLayoutProps = React.ComponentPropsWithoutRef<
	typeof chakra.main
> &
	FooterProps

export const MainLayout = ({ sponsors, ...props }) => {
	return (
		<>
			<Flex direction="column" minHeight="100vh" overflow="visible">
				<Nav />
				<chakra.main flexGrow="1" {...props} />
				<Footer sponsors={sponsors} />
			</Flex>
		</>
	)
}

MainLayout.displayName = "MainLayout"
