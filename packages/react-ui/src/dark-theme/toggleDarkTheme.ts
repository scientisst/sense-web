const toggleDarkTheme = () => {
	const darkPreference = window.matchMedia(
		"(prefers-color-scheme: dark)"
	).matches
	const newDarkTheme =
		localStorage && localStorage.getItem("darkTheme") !== null
			? localStorage.getItem("darkTheme") !== "true"
			: !darkPreference

	if (localStorage) {
		if (newDarkTheme === darkPreference) {
			localStorage.removeItem("darkTheme")
		} else {
			localStorage.setItem("darkTheme", newDarkTheme.toString())
		}
	}

	if (newDarkTheme) {
		document.documentElement.classList.add("dark")
	} else {
		document.documentElement.classList.remove("dark")
	}
}

export default toggleDarkTheme
