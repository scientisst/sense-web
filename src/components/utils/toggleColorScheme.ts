const toggleColorScheme = () => {
	const currentColorScheme =
		"theme" in localStorage
			? localStorage.theme
			: window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light"
	const newColorScheme = currentColorScheme === "dark" ? "light" : "dark"

	if (
		(newColorScheme === "dark") ===
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		localStorage.removeItem("theme")
	} else {
		localStorage.setItem("theme", newColorScheme)
	}

	if (newColorScheme === "dark") {
		document.documentElement.classList.add("dark")
	} else {
		document.documentElement.classList.remove("dark")
	}
}

export default toggleColorScheme
