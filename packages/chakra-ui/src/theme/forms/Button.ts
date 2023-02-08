import {
	StyleFunctionProps,
	defineStyle,
	defineStyleConfig
} from "@chakra-ui/react"

import { isLight, mode } from "../utils"

const solidColorMap: Record<string, (props: StyleFunctionProps) => string> = {
	brand: mode("brand.400", "brand.100"),
	red: mode("red.700", "red.300"),
	green: mode("green.700", "green.200")
}

export default defineStyleConfig({
	sizes: {
		md: defineStyle({
			height: "10",
			paddingLeft: "4",
			paddingRight: "4",
			rounded: "md",
			shadow: "md",
			_disabled: {
				shadow: "none"
			}
		})
	},
	variants: {
		solid: defineStyle(props => {
			const { colorScheme: c } = props

			const bg =
				c in solidColorMap
					? solidColorMap[c](props)
					: mode(`${c}.700`, `${c}.300`)(props)

			return {
				bg: bg,
				color: isLight(bg)(props) ? "gray.900" : "white",
				fontWeight: "500",
				_hover: {
					transform: "scale(1.05)"
				},
				_active: {
					transform: "scale(0.95)"
				},
				_disabled: {
					opacity: "0.4",
					cursor: "inherit",
					_hover: {
						transform: "none"
					},
					_active: {
						transform: "none"
					}
				}
			}
		}),
		ghost: defineStyle(props => {
			return {
				bg: mode("brand.gray.50", "brand.gray.700")(props),
				color: mode("gray.800", "gray.100")(props),
				fontWeight: "500",
				_hover: {
					transform: "scale(1.05)"
				},
				_active: {
					transform: "scale(0.95)"
				},
				_disabled: {
					opacity: "0.4",
					cursor: "inherit",
					_hover: {
						transform: "none"
					},
					_active: {
						transform: "none"
					}
				}
			}
		}),
		unstyled: {}
	},
	defaultProps: {
		size: "md",
		variant: "solid",
		colorScheme: "brand"
	}
})
