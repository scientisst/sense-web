"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var free_regular_svg_icons_1 = require("@fortawesome/free-regular-svg-icons");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var dark_theme_1 = require("../../../dark-theme");
var inputs_1 = require("../../inputs");
var navigation_1 = require("../../navigation");
var Header = function (_a) {
    var title = _a.title, shortTitle = _a.shortTitle, returnHref = _a.returnHref, homeHref = _a.homeHref, logo = _a.logo;
    return ((0, jsx_runtime_1.jsx)("nav", __assign({ className: "bg-primary text-over-primary-highest flex h-16 items-center justify-center drop-shadow-lg" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "container grid h-full select-none grid-cols-[4rem_auto_4rem] items-stretch justify-items-stretch sm:grid-cols-[8rem_auto_8rem] sm:px-4" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "flex items-center justify-start" }, { children: !!returnHref && ((0, jsx_runtime_1.jsx)(navigation_1.ImageAnchor, __assign({ href: returnHref, ariaLabel: "Return to previous page" }, { children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faChevronLeft, className: "h-8 w-8 p-4" }) }))) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex items-center justify-center" }, { children: !!title && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "mb-2 hidden font-secondary text-4xl uppercase leading-none sm:block" }, { children: title })), (0, jsx_runtime_1.jsx)("span", __assign({ className: "mb-2 font-secondary text-4xl uppercase leading-none sm:hidden" }, { children: shortTitle !== null && shortTitle !== void 0 ? shortTitle : title }))] })) })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center justify-end" }, { children: [(0, jsx_runtime_1.jsxs)(inputs_1.ImageButton, __assign({ onClick: dark_theme_1.toggleDarkTheme, className: "mr-4 hidden sm:flex" }, { children: [(0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_regular_svg_icons_1.faLightbulb, className: "inline h-6 w-6 p-3 dark:hidden" }), (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faLightbulb, className: "hidden h-6 w-6 p-3 dark:inline" })] })), (0, jsx_runtime_1.jsx)(navigation_1.ImageAnchor, __assign({ href: homeHref !== null && homeHref !== void 0 ? homeHref : "/", className: "flex h-16 w-16 items-center justify-center" }, { children: logo }))] }))] })) })));
};
exports.default = Header;
//# sourceMappingURL=Header.js.map