import resolveConfig from "tailwindcss/resolveConfig"

import tailwindConfig from "../../tailwind.config"

const fullConfig = resolveConfig(tailwindConfig)
const lineColorLight = fullConfig.theme.colors["primary-light"]
const lineColorDark = fullConfig.theme.colors["primary-dark"]
const outlineColorLight =
	fullConfig.theme.colors["over-background-highest-light"]
const outlineColorDark = fullConfig.theme.colors["over-background-highest-dark"]

export const DEBUG = true

export type intervalsProps = {
	name: string
	start: number
	end: number
	color: string
}
export type annotationProps = {
	name: string
	color: string
	pos: number
}

export function chartStyle(isDark: boolean) {
	return {
		className: "h-64 w-full",
		fontFamily: "Lexend",
		lineColor: isDark ? lineColorDark : lineColorLight,
		outlineColor: isDark ? outlineColorDark : outlineColorLight,
		margin: { top: 0, right: 0, bottom: 0, left: 0 }
	}
}
