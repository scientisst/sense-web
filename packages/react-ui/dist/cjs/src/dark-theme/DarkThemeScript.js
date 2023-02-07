"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
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
    return (0, jsx_runtime_1.jsx)("script", { dangerouslySetInnerHTML: { __html: code } });
};
exports.default = DarkThemeScript;
//# sourceMappingURL=DarkThemeScript.js.map