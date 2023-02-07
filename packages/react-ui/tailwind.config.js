const plugin = require("tailwindcss/plugin")

/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		colors: {
			"primary-light": "#EF4B59",
			"background-light": "#FFFFFF",
			"background-accent-light": "#F2F2F7",
			"over-primary-highest-light": "rgba(255, 255, 255, 1.0)",
			"over-primary-high-light": "rgba(255, 255, 255, 0.95)",
			"over-primary-medium-light": "rgba(255, 255, 255, 0.65)",
			"over-primary-low-light": "rgba(255, 255, 255, 0.34)",
			"over-background-highest-light": "rgba(0, 0, 0, 0.83)",
			"over-background-high-light": "rgba(0, 0, 0, 0.74)",
			"over-background-medium-light": "rgba(0, 0, 0, 0.54)",
			"over-background-low-light": "rgba(0, 0, 0, 0.16)",
			"primary-dark": "#F05463",
			"background-dark": "#1C1C1E",
			"background-accent-dark": "#2C2C2E",
			"over-primary-highest-dark": "rgba(255, 255, 255, 1.0)",
			"over-primary-high-dark": "rgba(255, 255, 255, 0.95)",
			"over-primary-medium-dark": "rgba(255, 255, 255, 0.65)",
			"over-primary-low-dark": "rgba(255, 255, 255, 0.34)",
			"over-background-highest-dark": "rgba(255, 255, 255, 1.0)",
			"over-background-high-dark": "rgba(255, 255, 255, 0.95)",
			"over-background-medium-dark": "rgba(255, 255, 255, 0.65)",
			"over-background-low-dark": "rgba(255, 255, 255, 0.34)"
		},
		extend: {
			fontFamily: {
				primary: ["Lexend", "sans-serif"],
				secondary: ["Imagine", "sans-serif"]
			},
			borderWidth: {
				3: "3px"
			},
			ringWidth: {
				3: "3px"
			},
			scale: {
				hover: "1.1",
				pressed: "0.9"
			}
		}
	},
	plugins: [
		plugin(function ({ addBase }) {
			addBase({
				"*": {
					"@apply leading-6 m-0 p-0 box-border font-primary font-normal text-base":
						{}
				},
				body: {
					"@apply bg-background text-over-background-highest": {}
				},
				".text-primary": {
					"@apply text-primary-light dark:text-primary-dark": {}
				},
				".bg-primary": {
					"@apply bg-primary-light dark:bg-primary-dark": {}
				},
				".border-primary": {
					"@apply border-primary-light dark:border-primary-dark": {}
				},
				".ring-primary": {
					"@apply ring-primary-light dark:ring-primary-dark": {}
				},
				".text-over-primary-highest": {
					"@apply text-over-primary-highest-light dark:text-over-primary-highest-dark":
						{}
				},
				".text-over-primary-high": {
					"@apply text-over-primary-high-light dark:text-over-primary-high-dark":
						{}
				},
				".text-over-primary-medium": {
					"@apply text-over-primary-medium-light dark:text-over-primary-medium-dark":
						{}
				},
				".text-over-primary-low": {
					"@apply text-over-primary-low-light dark:text-over-primary-low-dark":
						{}
				},
				".bg-over-primary-highest": {
					"@apply bg-over-primary-highest-light dark:bg-over-primary-highest-dark":
						{}
				},
				".bg-over-primary-high": {
					"@apply bg-over-primary-high-light dark:bg-over-primary-high-dark":
						{}
				},
				".bg-over-primary-medium": {
					"@apply bg-over-primary-medium-light dark:bg-over-primary-medium-dark":
						{}
				},
				".bg-over-primary-low": {
					"@apply bg-over-primary-low-light dark:bg-over-primary-low-dark":
						{}
				},
				".border-over-primary-highest": {
					"@apply border-over-primary-highest-light dark:border-over-primary-highest-dark":
						{}
				},
				".border-over-primary-high": {
					"@apply border-over-primary-high-light dark:border-over-primary-high-dark":
						{}
				},
				".border-over-primary-medium": {
					"@apply border-over-primary-medium-light dark:border-over-primary-medium-dark":
						{}
				},
				".border-over-primary-low": {
					"@apply border-over-primary-low-light dark:border-over-primary-low-dark":
						{}
				},
				".ring-over-primary-highest": {
					"@apply ring-over-primary-highest-light dark:ring-over-primary-highest-dark":
						{}
				},
				".ring-over-primary-high": {
					"@apply ring-over-primary-high-light dark:ring-over-primary-high-dark":
						{}
				},
				".ring-over-primary-medium": {
					"@apply ring-over-primary-medium-light dark:ring-over-primary-medium-dark":
						{}
				},
				".ring-over-primary-low": {
					"@apply ring-over-primary-low-light dark:ring-over-primary-low-dark":
						{}
				},
				".text-background": {
					"@apply text-background-light dark:text-background-dark": {}
				},
				".bg-background": {
					"@apply bg-background-light dark:bg-background-dark": {}
				},
				".border-background": {
					"@apply border-background-light dark:border-background-dark":
						{}
				},
				".ring-background": {
					"@apply ring-background-light dark:ring-background-dark": {}
				},
				".text-background-accent": {
					"@apply text-background-accent-light dark:text-background-accent-dark":
						{}
				},
				".bg-background-accent": {
					"@apply bg-background-accent-light dark:bg-background-accent-dark":
						{}
				},
				".border-background-accent": {
					"@apply border-background-accent-light dark:border-background-accent-dark":
						{}
				},
				".ring-background-accent": {
					"@apply ring-background-accent-light dark:ring-background-accent-dark":
						{}
				},
				".text-over-background-highest": {
					"@apply text-over-background-highest-light dark:text-over-background-highest-dark":
						{}
				},
				".text-over-background-high": {
					"@apply text-over-background-high-light dark:text-over-background-high-dark":
						{}
				},
				".text-over-background-medium": {
					"@apply text-over-background-medium-light dark:text-over-background-medium-dark":
						{}
				},
				".text-over-background-low": {
					"@apply text-over-background-low-light dark:text-over-background-low-dark":
						{}
				},
				".bg-over-background-highest": {
					"@apply bg-over-background-highest-light dark:bg-over-background-highest-dark":
						{}
				},
				".bg-over-background-high": {
					"@apply bg-over-background-high-light dark:bg-over-background-high-dark":
						{}
				},
				".bg-over-background-medium": {
					"@apply bg-over-background-medium-light dark:bg-over-background-medium-dark":
						{}
				},
				".bg-over-background-low": {
					"@apply bg-over-background-low-light dark:bg-over-background-low-dark":
						{}
				},
				".border-over-background-highest": {
					"@apply border-over-background-highest-light dark:border-over-background-highest-dark":
						{}
				},
				".border-over-background-high": {
					"@apply border-over-background-high-light dark:border-over-background-high-dark":
						{}
				},
				".border-over-background-medium": {
					"@apply border-over-background-medium-light dark:border-over-background-medium-dark":
						{}
				},
				".border-over-background-low": {
					"@apply border-over-background-low-light dark:border-over-background-low-dark":
						{}
				},
				".ring-over-background-highest": {
					"@apply ring-over-background-highest-light dark:ring-over-background-highest-dark":
						{}
				},
				".ring-over-background-high": {
					"@apply ring-over-background-high-light dark:ring-over-background-high-dark":
						{}
				},
				".ring-over-background-medium": {
					"@apply ring-over-background-medium-light dark:ring-over-background-medium-dark":
						{}
				},
				".ring-over-background-low": {
					"@apply ring-over-background-low-light dark:ring-over-background-low-dark":
						{}
				}
			})
		})
	]
}
