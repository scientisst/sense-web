module.exports = {
	plugins: [require("@trivago/prettier-plugin-sort-imports")],
	semi: false,
	singleQuote: false,
	arrowParens: "avoid",
	trailingComma: "none",
	endOfLine: "auto",
	tabWidth: 4,
	useTabs: true,
	printWidth: 80,
	importOrder: [
		"(^react$|^react/(.*)$)",
		"(^next$|^next/(.*)$)",
		"<THIRD_PARTY_MODULES>",
		"^@/(.*)$",
		"^~/(.*)$",
		"^[./]"
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	overrides: [
		{
			files: ["*.yaml", "*.yml"],
			options: {
				tabWidth: 2,
				useTabs: false
			}
		}
	]
}
