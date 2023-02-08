import { StyleFunctionProps } from "@chakra-ui/react"
import Color from "color"

import { getColor } from "./getColor"

export function isDark(color: string): (props: StyleFunctionProps) => boolean {
	return props => {
		return Color(getColor(color)(props)).isDark()
	}
}

export function isLight(color: string): (props: StyleFunctionProps) => boolean {
	return props => {
		return Color(getColor(color)(props)).isLight()
	}
}
