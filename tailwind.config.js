/** @type {import('tailwindcss').Config} */
module.exports = {
	presets: [require("@scientisst/react-ui/tailwindcss-config")],
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				// "primary-light": "#5DAF4F",
				// "primary-dark": "#5EBA4E"
			},
			fontFamily: {
				// primary: ["Lexend", "sans-serif"],
				// secondary: ["Imagine", "sans-serif"],
			}
		}
	}
}
