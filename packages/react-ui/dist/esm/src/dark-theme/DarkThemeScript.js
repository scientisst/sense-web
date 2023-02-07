import { jsx as _jsx } from "react/jsx-runtime";
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
var code = "\n(localStorage&&null!==localStorage.getItem(\"darkTheme\")?\"true\"===localStorage.getItem(\"darkTheme\"):window.matchMedia(\"(prefers-color-scheme: dark)\").matches)?document.documentElement.classList.add(\"dark\"):document.documentElement.classList.remove(\"dark\");\n";
var DarkThemeScript = function () {
    return _jsx("script", { dangerouslySetInnerHTML: { __html: code } });
};
export default DarkThemeScript;
//# sourceMappingURL=DarkThemeScript.js.map