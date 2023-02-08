import { StyleFunctionProps } from "@chakra-ui/react"

export function mode<T>(light: T, dark: T): (props: StyleFunctionProps) => T {
	return props => {
		return props.colorMode === "dark" ? dark : light
	}
}
