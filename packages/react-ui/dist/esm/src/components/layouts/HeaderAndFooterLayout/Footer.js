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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { ImageAnchor } from "../../navigation";
import FooterLinkSection from "./FooterLinkSection";
var Footer = function (_a) {
    var socialMediaLinks = _a.socialMediaLinks, logo = _a.logo, motto = _a.motto, sectionA = _a.sectionA, sectionB = _a.sectionB, sectionC = _a.sectionC, sponsorLinks = _a.sponsorLinks;
    return (_jsx("footer", __assign({ className: "bg-primary text-over-primary-highest flex justify-center overflow-hidden drop-shadow-lg" }, { children: _jsxs("div", __assign({ className: "container flex flex-col p-8" }, { children: [_jsxs("div", __assign({ className: "flex flex-col items-start justify-between gap-12 sm:flex-row sm:gap-8" }, { children: [_jsxs("div", __assign({ className: "flex max-w-[21rem] flex-col items-start gap-4" }, { children: [logo, _jsx("p", __assign({ className: "text-lg font-medium" }, { children: motto })), !!socialMediaLinks && (_jsx("div", __assign({ className: "m-[-0.5rem] flex" }, { children: socialMediaLinks.map(function (_a, index) {
                                        var href = _a.href, icon = _a.icon, ariaLabel = _a.ariaLabel;
                                        return (_jsx(ImageAnchor, __assign({ href: href, ariaLabel: ariaLabel }, { children: _jsx(FontAwesomeIcon, { icon: icon, className: "h-8 w-8 p-2" }) }), index));
                                    }) })))] })), !!sectionA && (_jsx(FooterLinkSection, __assign({}, sectionA, { className: clsx("flex sm:hidden xl:flex", sectionA.className) }))), !!sectionB && (_jsx(FooterLinkSection, __assign({}, sectionB, { className: clsx("flex sm:hidden xl:flex", sectionB.className) }))), !!sectionC && (_jsx(FooterLinkSection, __assign({}, sectionC, { className: clsx("flex sm:hidden xl:flex", sectionC.className) }))), !!sponsorLinks && (_jsx("div", __assign({ className: "flex flex-col items-start gap-4" }, { children: sponsorLinks.map(function (_a, index) {
                                var href = _a.href, img = _a.img, ariaLabel = _a.ariaLabel;
                                return (_jsx(ImageAnchor, __assign({ href: href, ariaLabel: ariaLabel }, { children: img }), index));
                            }) })))] })), _jsx("div", { className: "text-over-primary-highest my-8 hidden border-t opacity-50 sm:block xl:hidden" }), _jsxs("div", __assign({ className: "hidden items-start justify-between gap-8 sm:flex xl:hidden" }, { children: [!!sectionA && _jsx(FooterLinkSection, __assign({}, sectionA)), !!sectionB && _jsx(FooterLinkSection, __assign({}, sectionB)), !!sectionC && _jsx(FooterLinkSection, __assign({}, sectionC))] }))] })) })));
};
export default Footer;
//# sourceMappingURL=Footer.js.map