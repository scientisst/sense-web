export type TintColor =
	| "yellow"
	| "green"
	| "mint"
	| "blue"
	| "purple"
	| "red"
	| "orange"

export const tintBackgroundClass: Record<TintColor, string> = {
	yellow: "bg-tint-yellow dark:bg-tint-yellow-dark text-primary-black",
	green: "bg-tint-green dark:bg-tint-green-dark text-primary-white",
	mint: "bg-tint-mint dark:bg-tint-mint-dark text-primary-white",
	blue: "bg-tint-blue dark:bg-tint-blue-dark text-primary-white",
	purple: "bg-tint-purple dark:bg-tint-purple-dark text-primary-white",
	red: "bg-tint-red dark:bg-tint-red-dark text-primary-white",
	orange: "bg-tint-orange dark:bg-tint-orange-dark text-primary-white"
}
