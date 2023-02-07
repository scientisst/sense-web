import { useEffect, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
var useDarkTheme = function () {
    var _a = useState(false), darkTheme = _a[0], setDarkTheme = _a[1];
    var darkPreference = useMediaQuery("(prefers-color-scheme: dark)");
    useEffect(function () {
        if (localStorage && localStorage.getItem("darkTheme") !== null) {
            setDarkTheme(localStorage.getItem("darkTheme") === "true");
        }
        else {
            setDarkTheme(darkPreference);
        }
    }, [darkPreference]);
    useEffect(function () {
        var observer = new MutationObserver(function () {
            setDarkTheme(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"]
        });
        return function () {
            observer.disconnect();
        };
    }, []);
    return darkTheme;
};
export default useDarkTheme;
//# sourceMappingURL=useDarkTheme.js.map