module.exports = {
	extends: [
		"next/core-web-vitals",
		"plugin:@typescript-eslint/recommended",
		"turbo",
		"prettier"
	],
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"react",
		"react-hooks",
		"jsx-a11y",
		"import",
		"prettier"
	],
	rules: {
		"prettier/prettier": "error",
		"no-html-link-for-pages": "off"
	}
}
