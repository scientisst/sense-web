/*
;(function () {
const darkTheme =
    localStorage && localStorage.getItem("darkTheme") !== null
        ? localStorage.getItem("darkTheme") === "true"
        : window.matchMedia("(prefers-color-scheme: dark)").matches

if (darkTheme) {
	document.documentElement.classList.add("dark")
} else {
	document.documentElement.classList.remove("dark")
}
})()
*/

// Uglified code
const code = `
(localStorage&&null!==localStorage.getItem("darkTheme")?"true"===localStorage.getItem("darkTheme"):window.matchMedia("(prefers-color-scheme: dark)").matches)?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark");
`

const DarkThemeScript = () => {
	return <script dangerouslySetInnerHTML={{ __html: code }} />
}

export default DarkThemeScript
