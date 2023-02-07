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
import Footer from "./Footer";
import Header from "./Header";
var HeaderAndFooterLayout = function (_a) {
    var children = _a.children, className = _a.className, style = _a.style, title = _a.title, shortTitle = _a.shortTitle, returnHref = _a.returnHref, homeHref = _a.homeHref, headerLogo = _a.headerLogo, footerLogo = _a.footerLogo, motto = _a.motto, socialMediaLinks = _a.socialMediaLinks, sectionA = _a.sectionA, sectionB = _a.sectionB, sectionC = _a.sectionC, sponsorLinks = _a.sponsorLinks;
    return (_jsxs("div", __assign({ className: "grid h-screen w-screen grid-cols-1 grid-rows-[min-content_auto] overflow-hidden" }, { children: [_jsx(Header, { title: title, shortTitle: shortTitle, returnHref: returnHref, homeHref: homeHref, logo: headerLogo }), _jsxs("div", __assign({ className: "grid grid-cols-1 grid-rows-[min-content_auto_min-content] content-between overflow-y-auto overflow-x-hidden" }, { children: [_jsx("div", {}), _jsx("div", __assign({ className: "flex items-center justify-center overflow-visible" }, { children: _jsx("main", __assign({ className: className, style: style }, { children: children })) })), _jsx(Footer, { logo: footerLogo, motto: motto, socialMediaLinks: socialMediaLinks, sectionA: sectionA, sectionB: sectionB, sectionC: sectionC, sponsorLinks: sponsorLinks })] }))] })));
};
export default HeaderAndFooterLayout;
//# sourceMappingURL=index.js.map