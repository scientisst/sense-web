export type TintColor =
	| "yellow"
	| "green"
	| "mint"
	| "blue"
	| "purple"
	| "red"
	| "orange"

const tintBackgroundClass: Record<TintColor, string> = {
	yellow: "bg-tint-yellow dark:bg-tint-yellow-dark text-primary-black",
	green: "bg-tint-green dark:bg-tint-green-dark text-primary-white",
	mint: "bg-tint-mint dark:bg-tint-mint-dark text-primary-white",
	blue: "bg-tint-blue dark:bg-tint-blue-dark text-primary-white",
	purple: "bg-tint-purple dark:bg-tint-purple-dark text-primary-white",
	red: "bg-tint-red dark:bg-tint-red-dark text-primary-white",
	orange: "bg-tint-orange dark:bg-tint-orange-dark text-primary-white"
}

const tintBorderClass: Record<TintColor, string> = {
	yellow: "border-tint-yellow dark:border-tint-yellow-dark",
	green: "border-tint-green dark:border-tint-green-dark",
	mint: "border-tint-mint dark:border-tint-mint-dark",
	blue: "border-tint-blue dark:border-tint-blue-dark",
	purple: "border-tint-purple dark:border-tint-purple-dark",
	red: "border-tint-red dark:border-tint-red-dark",
	orange: "border-tint-orange dark:border-tint-orange-dark"
}

const tintTextClass: Record<TintColor, string> = {
	yellow: "text-tint-yellow dark:text-tint-yellow-dark",
	green: "text-tint-green dark:text-tint-green-dark",
	mint: "text-tint-mint dark:text-tint-mint-dark",
	blue: "text-tint-blue dark:text-tint-blue-dark",
	purple: "text-tint-purple dark:text-tint-purple-dark",
	red: "text-tint-red dark:text-tint-red-dark",
	orange: "text-tint-orange dark:text-tint-orange-dark"
}

const tintRingClass: Record<TintColor, string> = {
	yellow: "ring-tint-yellow dark:ring-tint-yellow-dark",
	green: "ring-tint-green dark:ring-tint-green-dark",
	mint: "ring-tint-mint dark:ring-tint-mint-dark",
	blue: "ring-tint-blue dark:ring-tint-blue-dark",
	purple: "ring-tint-purple dark:ring-tint-purple-dark",
	red: "ring-tint-red dark:ring-tint-red-dark",
	orange: "ring-tint-orange dark:ring-tint-orange-dark"
}

export const tintToClassName: {
	background: Record<TintColor, string>
	border: Record<TintColor, string>
	text: Record<TintColor, string>
	ring: Record<TintColor, string>
} = {
	background: tintBackgroundClass,
	border: tintBorderClass,
	text: tintTextClass,
	ring: tintRingClass
}
