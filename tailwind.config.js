/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"tint-yellow": "#FFC56F",
				"tint-yellow-dark": "#FFCC7A",
				"tint-green": "#5DAF4F",
				"tint-green-dark": "#5EBA4E",
				"tint-mint": "#00A9A1",
				"tint-mint-dark": "#56C7C3",
				"tint-blue": "#0089BF",
				"tint-blue-dark": "#138EBF",
				"tint-purple": "#5050A0",
				"tint-purple-dark": "#5875B0",
				"tint-red": "#EF4B59",
				"tint-red-dark": "#F05463",
				"tint-orange": "#F1643D",
				"tint-orange-dark": "#F26C46"
			},
			backgroundColor: {
				primary: "#FFFFFF",
				"primary-dark": "#1C1C1E",
				secondary: "#F2F2F7",
				"secondary-dark": "#2C2C2E"
			},
			textColor: {
				"primary-black": "rgba(0, 0, 0, 1.0)",
				"primary-white": "rgba(255, 255, 255, 1.0)",
				"secondary-black": "rgba(60, 60, 66, 0.6)",
				"secondary-white": "rgba(235, 235, 245, 0.6)",
				"tertiary-black": "rgba(60, 60, 67, 0.3)",
				"tertiary-white": "rgba(235, 235, 245, 0.3)",
				"quaternary-black": "rgba(60, 60, 67, 0.18)",
				"quaternary-white": "rgba(235, 235, 245, 0.18)"
			}
		}
	},
	plugins: []
}
