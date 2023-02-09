import { theme } from "@chakra-ui/react"

import colors from "./colors"
import Button from "./forms/Button"

export const defaultScientISSTTheme = {
	...theme,
	config: {
		...theme.config,
		cssVarPrefix: "ck",
		initialColorMode: "system",
		useSystemColorMode: true
	},
	styles: {
		...theme.styles,
		global: {
			// "html, body": {
			// 	color: "gray.800",
			// 	bg: "brand.gray.50",
			// 	fontFamily: "body",
			// 	lineHeight: "base",
			// 	fontSize: "md",
			// 	fontWeight: "normal",
			// 	letterSpacing: "normal",
			// 	_dark: {
			// 		color: "gray.100",
			// 		bg: "brand.gray.900"
			// 	}
			// }
		}
	},
	fonts: {
		body: "var(--font-poppins), sans-serif",
		heading: "var(--font-poppins), sans-serif",
		mono: "monospace"
	},
	colors,
	sizes: {
		...theme.sizes,
		container: {
			...theme.sizes.container,
			"2xl": "1536px"
		}
	},
	components: {
		...theme.components,
		Button
	}
}
