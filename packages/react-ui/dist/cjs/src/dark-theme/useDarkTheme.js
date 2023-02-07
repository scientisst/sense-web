"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useMediaQuery_1 = __importDefault(require("../hooks/useMediaQuery"));
var useDarkTheme = function () {
    var _a = (0, react_1.useState)(false), darkTheme = _a[0], setDarkTheme = _a[1];
    var darkPreference = (0, useMediaQuery_1.default)("(prefers-color-scheme: dark)");
    (0, react_1.useEffect)(function () {
        if (localStorage && localStorage.getItem("darkTheme") !== null) {
            setDarkTheme(localStorage.getItem("darkTheme") === "true");
        }
        else {
            setDarkTheme(darkPreference);
        }
    }, [darkPreference]);
    (0, react_1.useEffect)(function () {
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
exports.default = useDarkTheme;
//# sourceMappingURL=useDarkTheme.js.map