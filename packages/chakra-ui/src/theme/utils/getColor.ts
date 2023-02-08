import { StyleFunctionProps } from "@chakra-ui/react"

export function getColor(color: string): (props: StyleFunctionProps) => string {
	return props => {
		const colorKeys = color.split(".")
		const colorResolved = colorKeys.reduce((acc, key) => {
			const next = acc[key]

			if (!next) {
				throw new Error(`Color ${color} not found in theme`)
			}

			return acc[key]
		}, props.theme.colors)

		if (!colorResolved) {
			throw new Error(`Color ${color} not found in theme`)
		}

		return colorResolved
	}
}
