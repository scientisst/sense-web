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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import clsx from "clsx";
var FooterLinkSection = function (_a) {
    var title = _a.title, links = _a.links, className = _a.className, style = _a.style;
    return (_jsxs("div", __assign({ className: clsx("mt-[-0.75rem] flex flex-col items-start gap-2", className), style: style }, { children: [_jsx("h4", __assign({ className: "mb-2 font-secondary text-2xl" }, { children: title })), links.map(function (_a, index) {
                var href = _a.href, label = _a.label;
                return (_jsx(Link, __assign({ href: href, className: "text-over-primary-highest motion-safe:hover:scale-hover motion-safe:active:scale-pressed" }, { children: label }), index));
            })] })));
};
export default FooterLinkSection;
//# sourceMappingURL=FooterLinkSection.js.map