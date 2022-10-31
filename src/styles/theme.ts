import clsx from "clsx"

import textColors from "./textColors.json"
import themes from "./themes.json"

export type TintColor =
	| "yellow"
	| "green"
	| "mint"
	| "blue"
	| "purple"
	| "red"
	| "orange"

export type ThemeColor = "light" | "dark"
export type TextEmphasis = "primary" | "secondary" | "tertiary" | "quaternary"
export type BackgroundEmphasis = "primary" | "secondary"
export type TextColor = "white" | "black"

const whiteText: Record<TextEmphasis, string> = textColors.white
const blackText: Record<TextEmphasis, string> = textColors.black

export const theme: Record<
	ThemeColor,
	{
		background: Record<BackgroundEmphasis, string>
		tint: Record<TintColor, string>
		textOver: {
			background: Record<TextEmphasis, string>
			tint: Record<TintColor, Record<TextEmphasis, string>>
		}
	}
> = {
	light: {
		...themes.light,
		textOver: {
			background:
				themes.light.textOver.background === "black"
					? blackText
					: whiteText,
			tint: {
				yellow:
					themes.light.textOver.tint.yellow === "black"
						? blackText
						: whiteText,
				green:
					themes.light.textOver.tint.green === "black"
						? blackText
						: whiteText,
				mint:
					themes.light.textOver.tint.mint === "black"
						? blackText
						: whiteText,
				blue:
					themes.light.textOver.tint.blue === "black"
						? blackText
						: whiteText,
				purple:
					themes.light.textOver.tint.purple === "black"
						? blackText
						: whiteText,
				red:
					themes.light.textOver.tint.red === "black"
						? blackText
						: whiteText,
				orange:
					themes.light.textOver.tint.orange === "black"
						? blackText
						: whiteText
			}
		}
	},
	dark: {
		background: {
			primary: "#1C1C1E",
			secondary: "#2C2C2E"
		},
		tint: {
			yellow: "#FFCC7A",
			green: "#5EBA4E",
			mint: "#56C7C3",
			blue: "#138EBF",
			purple: "#5875B0",
			red: "#F05463",
			orange: "#F26C46"
		},
		textOver: {
			background:
				themes.dark.textOver.background === "black"
					? blackText
					: whiteText,
			tint: {
				yellow:
					themes.dark.textOver.tint.yellow === "black"
						? blackText
						: whiteText,
				green:
					themes.dark.textOver.tint.green === "black"
						? blackText
						: whiteText,
				mint:
					themes.dark.textOver.tint.mint === "black"
						? blackText
						: whiteText,
				blue:
					themes.dark.textOver.tint.blue === "black"
						? blackText
						: whiteText,
				purple:
					themes.dark.textOver.tint.purple === "black"
						? blackText
						: whiteText,
				red:
					themes.dark.textOver.tint.red === "black"
						? blackText
						: whiteText,
				orange:
					themes.dark.textOver.tint.orange === "black"
						? blackText
						: whiteText
			}
		}
	}
}

const backgroundColorClassNames = (
	lightThemeTextColor: string,
	darkThemeTextColor: string
) => {
	return {
		primary: clsx({
			"bg-primary-white": lightThemeTextColor === "white",
			"bg-primary-black": lightThemeTextColor === "black",
			"dark:bg-primary-white": darkThemeTextColor === "white",
			"dark:bg-primary-black": darkThemeTextColor === "black"
		}),
		secondary: clsx({
			"bg-secondary-white": lightThemeTextColor === "white",
			"bg-secondary-black": lightThemeTextColor === "black",
			"dark:bg-secondary-white": darkThemeTextColor === "white",
			"dark:bg-secondary-black": darkThemeTextColor === "black"
		}),
		tertiary: clsx({
			"bg-tertiary-white": lightThemeTextColor === "white",
			"bg-tertiary-black": lightThemeTextColor === "black",
			"dark:bg-tertiary-white": darkThemeTextColor === "white",
			"dark:bg-tertiary-black": darkThemeTextColor === "black"
		}),
		quaternary: clsx({
			"bg-quaternary-white": lightThemeTextColor === "white",
			"bg-quaternary-black": lightThemeTextColor === "black",
			"dark:bg-quaternary-white": darkThemeTextColor === "white",
			"dark:bg-quaternary-black": darkThemeTextColor === "black"
		})
	}
}

const borderColorClassNames = (
	lightThemeTextColor: string,
	darkThemeTextColor: string
) => {
	return {
		primary: clsx({
			"border-primary-white": lightThemeTextColor === "white",
			"border-primary-black": lightThemeTextColor === "black",
			"dark:border-primary-white": darkThemeTextColor === "white",
			"dark:border-primary-black": darkThemeTextColor === "black"
		}),
		secondary: clsx({
			"border-secondary-white": lightThemeTextColor === "white",
			"border-secondary-black": lightThemeTextColor === "black",
			"dark:border-secondary-white": darkThemeTextColor === "white",
			"dark:border-secondary-black": darkThemeTextColor === "black"
		}),
		tertiary: clsx({
			"border-tertiary-white": lightThemeTextColor === "white",
			"border-tertiary-black": lightThemeTextColor === "black",
			"dark:border-tertiary-white": darkThemeTextColor === "white",
			"dark:border-tertiary-black": darkThemeTextColor === "black"
		}),
		quaternary: clsx({
			"border-quaternary-white": lightThemeTextColor === "white",
			"border-quaternary-black": lightThemeTextColor === "black",
			"dark:border-quaternary-white": darkThemeTextColor === "white",
			"dark:border-quaternary-black": darkThemeTextColor === "black"
		})
	}
}

const ringColorClassNames = (
	lightThemeTextColor: string,
	darkThemeTextColor: string
) => {
	return {
		primary: clsx({
			"ring-primary-white": lightThemeTextColor === "white",
			"ring-primary-black": lightThemeTextColor === "black",
			"dark:ring-primary-white": darkThemeTextColor === "white",
			"dark:ring-primary-black": darkThemeTextColor === "black"
		}),
		secondary: clsx({
			"ring-secondary-white": lightThemeTextColor === "white",
			"ring-secondary-black": lightThemeTextColor === "black",
			"dark:ring-secondary-white": darkThemeTextColor === "white",
			"dark:ring-secondary-black": darkThemeTextColor === "black"
		}),
		tertiary: clsx({
			"ring-tertiary-white": lightThemeTextColor === "white",
			"ring-tertiary-black": lightThemeTextColor === "black",
			"dark:ring-tertiary-white": darkThemeTextColor === "white",
			"dark:ring-tertiary-black": darkThemeTextColor === "black"
		}),
		quaternary: clsx({
			"ring-quaternary-white": lightThemeTextColor === "white",
			"ring-quaternary-black": lightThemeTextColor === "black",
			"dark:ring-quaternary-white": darkThemeTextColor === "white",
			"dark:ring-quaternary-black": darkThemeTextColor === "black"
		})
	}
}

const textColorClassNames = (
	lightThemeTextColor: string,
	darkThemeTextColor: string
) => {
	return {
		primary: clsx({
			"text-primary-white": lightThemeTextColor === "white",
			"text-primary-black": lightThemeTextColor === "black",
			"dark:text-primary-white": darkThemeTextColor === "white",
			"dark:text-primary-black": darkThemeTextColor === "black"
		}),
		secondary: clsx({
			"text-secondary-white": lightThemeTextColor === "white",
			"text-secondary-black": lightThemeTextColor === "black",
			"dark:text-secondary-white": darkThemeTextColor === "white",
			"dark:text-secondary-black": darkThemeTextColor === "black"
		}),
		tertiary: clsx({
			"text-tertiary-white": lightThemeTextColor === "white",
			"text-tertiary-black": lightThemeTextColor === "black",
			"dark:text-tertiary-white": darkThemeTextColor === "white",
			"dark:text-tertiary-black": darkThemeTextColor === "black"
		}),
		quaternary: clsx({
			"text-quaternary-white": lightThemeTextColor === "white",
			"text-quaternary-black": lightThemeTextColor === "black",
			"dark:text-quaternary-white": darkThemeTextColor === "white",
			"dark:text-quaternary-black": darkThemeTextColor === "black"
		})
	}
}

const placeholderColorClassNames = (
	lightThemeTextColor: string,
	darkThemeTextColor: string
) => {
	return {
		primary: clsx({
			"placeholder:text-primary-white": lightThemeTextColor === "white",
			"placeholder:text-primary-black": lightThemeTextColor === "black",
			"dark:placeholder:text-primary-white":
				darkThemeTextColor === "white",
			"dark:placeholder:text-primary-black":
				darkThemeTextColor === "black"
		}),
		secondary: clsx({
			"placeholder:text-secondary-white": lightThemeTextColor === "white",
			"placeholder:text-secondary-black": lightThemeTextColor === "black",
			"dark:placeholder:text-secondary-white":
				darkThemeTextColor === "white",
			"dark:placeholder:text-secondary-black":
				darkThemeTextColor === "black"
		}),
		tertiary: clsx({
			"placeholder:text-tertiary-white": lightThemeTextColor === "white",
			"placeholder:text-tertiary-black": lightThemeTextColor === "black",
			"dark:placeholder:text-tertiary-white":
				darkThemeTextColor === "white",
			"dark:placeholder:text-tertiary-black":
				darkThemeTextColor === "black"
		}),
		quaternary: clsx({
			"placeholder:text-quaternary-white":
				lightThemeTextColor === "white",
			"placeholder:text-quaternary-black":
				lightThemeTextColor === "black",
			"dark:placeholder:text-quaternary-white":
				darkThemeTextColor === "white",
			"dark:placeholder:text-quaternary-black":
				darkThemeTextColor === "black"
		})
	}
}

export const themeTw = {
	background: {
		background: {
			primary: "bg-primary dark:bg-primary-dark",
			secondary: "bg-secondary dark:bg-secondary-dark"
		},
		tint: {
			yellow: "bg-tint-yellow dark:bg-tint-yellow-dark",
			green: "bg-tint-green dark:bg-tint-green-dark",
			mint: "bg-tint-mint dark:bg-tint-mint-dark",
			blue: "bg-tint-blue dark:bg-tint-blue-dark",
			purple: "bg-tint-purple dark:bg-tint-purple-dark",
			red: "bg-tint-red dark:bg-tint-red-dark",
			orange: "bg-tint-orange dark:bg-tint-orange-dark"
		},
		textOver: {
			background: backgroundColorClassNames(
				themes.light.textOver.background,
				themes.dark.textOver.background
			),
			tint: {
				yellow: backgroundColorClassNames(
					themes.light.textOver.tint.yellow,
					themes.dark.textOver.tint.yellow
				),
				green: backgroundColorClassNames(
					themes.light.textOver.tint.green,
					themes.dark.textOver.tint.green
				),
				mint: backgroundColorClassNames(
					themes.light.textOver.tint.mint,
					themes.dark.textOver.tint.mint
				),
				blue: backgroundColorClassNames(
					themes.light.textOver.tint.blue,
					themes.dark.textOver.tint.blue
				),
				purple: backgroundColorClassNames(
					themes.light.textOver.tint.purple,
					themes.dark.textOver.tint.purple
				),
				red: backgroundColorClassNames(
					themes.light.textOver.tint.red,
					themes.dark.textOver.tint.red
				),
				orange: backgroundColorClassNames(
					themes.light.textOver.tint.orange,
					themes.dark.textOver.tint.orange
				)
			}
		}
	},
	border: {
		background: {
			primary: "border-primary dark:border-primary-dark",
			secondary: "border-secondary dark:border-secondary-dark"
		},
		tint: {
			yellow: "border-tint-yellow dark:border-tint-yellow-dark",
			green: "border-tint-green dark:border-tint-green-dark",
			mint: "border-tint-mint dark:border-tint-mint-dark",
			blue: "border-tint-blue dark:border-tint-blue-dark",
			purple: "border-tint-purple dark:border-tint-purple-dark",
			red: "border-tint-red dark:border-tint-red-dark",
			orange: "border-tint-orange dark:border-tint-orange-dark"
		},
		textOver: {
			background: borderColorClassNames(
				themes.light.textOver.background,
				themes.dark.textOver.background
			),
			tint: {
				yellow: borderColorClassNames(
					themes.light.textOver.tint.yellow,
					themes.dark.textOver.tint.yellow
				),
				green: borderColorClassNames(
					themes.light.textOver.tint.green,
					themes.dark.textOver.tint.green
				),
				mint: borderColorClassNames(
					themes.light.textOver.tint.mint,
					themes.dark.textOver.tint.mint
				),
				blue: borderColorClassNames(
					themes.light.textOver.tint.blue,
					themes.dark.textOver.tint.blue
				),
				purple: borderColorClassNames(
					themes.light.textOver.tint.purple,
					themes.dark.textOver.tint.purple
				),
				red: borderColorClassNames(
					themes.light.textOver.tint.red,
					themes.dark.textOver.tint.red
				),
				orange: borderColorClassNames(
					themes.light.textOver.tint.orange,
					themes.dark.textOver.tint.orange
				)
			}
		}
	},
	ring: {
		background: {
			primary: "ring-primary dark:ring-primary-dark",
			secondary: "ring-secondary dark:ring-secondary-dark"
		},
		tint: {
			yellow: "ring-tint-yellow dark:ring-tint-yellow-dark",
			green: "ring-tint-green dark:ring-tint-green-dark",
			mint: "ring-tint-mint dark:ring-tint-mint-dark",
			blue: "ring-tint-blue dark:ring-tint-blue-dark",
			purple: "ring-tint-purple dark:ring-tint-purple-dark",
			red: "ring-tint-red dark:ring-tint-red-dark",
			orange: "ring-tint-orange dark:ring-tint-orange-dark"
		},
		textOver: {
			background: ringColorClassNames(
				themes.light.textOver.background,
				themes.dark.textOver.background
			),
			tint: {
				yellow: ringColorClassNames(
					themes.light.textOver.tint.yellow,
					themes.dark.textOver.tint.yellow
				),
				green: ringColorClassNames(
					themes.light.textOver.tint.green,
					themes.dark.textOver.tint.green
				),
				mint: ringColorClassNames(
					themes.light.textOver.tint.mint,
					themes.dark.textOver.tint.mint
				),
				blue: ringColorClassNames(
					themes.light.textOver.tint.blue,
					themes.dark.textOver.tint.blue
				),
				purple: ringColorClassNames(
					themes.light.textOver.tint.purple,
					themes.dark.textOver.tint.purple
				),
				red: ringColorClassNames(
					themes.light.textOver.tint.red,
					themes.dark.textOver.tint.red
				),
				orange: ringColorClassNames(
					themes.light.textOver.tint.orange,
					themes.dark.textOver.tint.orange
				)
			}
		}
	},
	text: {
		background: {
			primary: "text-primary dark:text-primary-dark",
			secondary: "text-secondary dark:text-secondary-dark"
		},
		tint: {
			yellow: "text-tint-yellow dark:text-tint-yellow-dark",
			green: "text-tint-green dark:text-tint-green-dark",
			mint: "text-tint-mint dark:text-tint-mint-dark",
			blue: "text-tint-blue dark:text-tint-blue-dark",
			purple: "text-tint-purple dark:text-tint-purple-dark",
			red: "text-tint-red dark:text-tint-red-dark",
			orange: "text-tint-orange dark:text-tint-orange-dark"
		},
		textOver: {
			background: textColorClassNames(
				themes.light.textOver.background,
				themes.dark.textOver.background
			),
			tint: {
				yellow: textColorClassNames(
					themes.light.textOver.tint.yellow,
					themes.dark.textOver.tint.yellow
				),
				green: textColorClassNames(
					themes.light.textOver.tint.green,
					themes.dark.textOver.tint.green
				),
				mint: textColorClassNames(
					themes.light.textOver.tint.mint,
					themes.dark.textOver.tint.mint
				),
				blue: textColorClassNames(
					themes.light.textOver.tint.blue,
					themes.dark.textOver.tint.blue
				),
				purple: textColorClassNames(
					themes.light.textOver.tint.purple,
					themes.dark.textOver.tint.purple
				),
				red: textColorClassNames(
					themes.light.textOver.tint.red,
					themes.dark.textOver.tint.red
				),
				orange: textColorClassNames(
					themes.light.textOver.tint.orange,
					themes.dark.textOver.tint.orange
				)
			}
		}
	},
	placeholder: {
		background: {
			primary:
				"placeholder:text-primary dark:placeholder:text-primary-dark",
			secondary:
				"placeholder:text-secondary dark:placeholder:text-secondary-dark"
		},
		tint: {
			yellow: "placeholder:text-tint-yellow dark:placeholder:text-tint-yellow-dark",
			green: "placeholder:text-tint-green dark:placeholder:text-tint-green-dark",
			mint: "placeholder:text-tint-mint dark:placeholder:text-tint-mint-dark",
			blue: "placeholder:text-tint-blue dark:placeholder:text-tint-blue-dark",
			purple: "placeholder:text-tint-purple dark:placeholder:text-tint-purple-dark",
			red: "placeholder:text-tint-red dark:placeholder:text-tint-red-dark",
			orange: "placeholder:text-tint-orange dark:placeholder:text-tint-orange-dark"
		},
		textOver: {
			background: placeholderColorClassNames(
				themes.light.textOver.background,
				themes.dark.textOver.background
			),
			tint: {
				yellow: placeholderColorClassNames(
					themes.light.textOver.tint.yellow,
					themes.dark.textOver.tint.yellow
				),
				green: placeholderColorClassNames(
					themes.light.textOver.tint.green,
					themes.dark.textOver.tint.green
				),
				mint: placeholderColorClassNames(
					themes.light.textOver.tint.mint,
					themes.dark.textOver.tint.mint
				),
				blue: placeholderColorClassNames(
					themes.light.textOver.tint.blue,
					themes.dark.textOver.tint.blue
				),
				purple: placeholderColorClassNames(
					themes.light.textOver.tint.purple,
					themes.dark.textOver.tint.purple
				),
				red: placeholderColorClassNames(
					themes.light.textOver.tint.red,
					themes.dark.textOver.tint.red
				),
				orange: placeholderColorClassNames(
					themes.light.textOver.tint.orange,
					themes.dark.textOver.tint.orange
				)
			}
		}
	}
}
