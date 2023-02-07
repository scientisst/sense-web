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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { faLightbulb as faLightbulbRegular } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft, faLightbulb as faLightbulbSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleDarkTheme } from "../../../dark-theme";
import { ImageButton } from "../../inputs";
import { ImageAnchor } from "../../navigation";
var Header = function (_a) {
    var title = _a.title, shortTitle = _a.shortTitle, returnHref = _a.returnHref, homeHref = _a.homeHref, logo = _a.logo;
    return (_jsx("nav", __assign({ className: "bg-primary text-over-primary-highest flex h-16 items-center justify-center drop-shadow-lg" }, { children: _jsxs("div", __assign({ className: "container grid h-full select-none grid-cols-[4rem_auto_4rem] items-stretch justify-items-stretch sm:grid-cols-[8rem_auto_8rem] sm:px-4" }, { children: [_jsx("div", __assign({ className: "flex items-center justify-start" }, { children: !!returnHref && (_jsx(ImageAnchor, __assign({ href: returnHref, ariaLabel: "Return to previous page" }, { children: _jsx(FontAwesomeIcon, { icon: faChevronLeft, className: "h-8 w-8 p-4" }) }))) })), _jsx("div", __assign({ className: "flex items-center justify-center" }, { children: !!title && (_jsxs(_Fragment, { children: [_jsx("span", __assign({ className: "mb-2 hidden font-secondary text-4xl uppercase leading-none sm:block" }, { children: title })), _jsx("span", __assign({ className: "mb-2 font-secondary text-4xl uppercase leading-none sm:hidden" }, { children: shortTitle !== null && shortTitle !== void 0 ? shortTitle : title }))] })) })), _jsxs("div", __assign({ className: "flex items-center justify-end" }, { children: [_jsxs(ImageButton, __assign({ onClick: toggleDarkTheme, className: "mr-4 hidden sm:flex" }, { children: [_jsx(FontAwesomeIcon, { icon: faLightbulbRegular, className: "inline h-6 w-6 p-3 dark:hidden" }), _jsx(FontAwesomeIcon, { icon: faLightbulbSolid, className: "hidden h-6 w-6 p-3 dark:inline" })] })), _jsx(ImageAnchor, __assign({ href: homeHref !== null && homeHref !== void 0 ? homeHref : "/", className: "flex h-16 w-16 items-center justify-center" }, { children: logo }))] }))] })) })));
};
export default Header;
//# sourceMappingURL=Header.js.map