const themes = require("./src/styles/themes.json")
const textColors = require("./src/styles/textColors.json")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			borderWidth: {
				3: "3px"
			},
			ringWidth: {
				3: "3px"
			},
			colors: {
				"tint-yellow": themes.light.tint.yellow,
				"tint-yellow-dark": themes.dark.tint.yellow,
				"tint-green": themes.light.tint.green,
				"tint-green-dark": themes.dark.tint.green,
				"tint-mint": themes.light.tint.mint,
				"tint-mint-dark": themes.dark.tint.mint,
				"tint-blue": themes.light.tint.blue,
				"tint-blue-dark": themes.dark.tint.blue,
				"tint-purple": themes.light.tint.purple,
				"tint-purple-dark": themes.dark.tint.purple,
				"tint-red": themes.light.tint.red,
				"tint-red-dark": themes.dark.tint.red,
				"tint-orange": themes.light.tint.orange,
				"tint-orange-dark": themes.dark.tint.orange,
				// Background colors
				primary: themes.light.background.primary,
				"primary-dark": themes.dark.background.primary,
				secondary: themes.light.background.secondary,
				"secondary-dark": themes.dark.background.secondary,
				// Text colors
				"primary-black": textColors.black.primary,
				"primary-white": textColors.white.primary,
				"secondary-black": textColors.black.secondary,
				"secondary-white": textColors.white.secondary,
				"tertiary-black": textColors.black.tertiary,
				"tertiary-white": textColors.white.tertiary,
				"quaternary-black": textColors.black.quaternary,
				"quaternary-white": textColors.white.quaternary
			},
			scale: {
				hover: "1.1",
				pressed: "0.9"
			}
		}
	},
	plugins: []
}
