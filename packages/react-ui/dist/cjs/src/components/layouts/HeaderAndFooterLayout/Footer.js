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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var clsx_1 = __importDefault(require("clsx"));
var navigation_1 = require("../../navigation");
var FooterLinkSection_1 = __importDefault(require("./FooterLinkSection"));
var Footer = function (_a) {
    var socialMediaLinks = _a.socialMediaLinks, logo = _a.logo, motto = _a.motto, sectionA = _a.sectionA, sectionB = _a.sectionB, sectionC = _a.sectionC, sponsorLinks = _a.sponsorLinks;
    return ((0, jsx_runtime_1.jsx)("footer", __assign({ className: "bg-primary text-over-primary-highest flex justify-center overflow-hidden drop-shadow-lg" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "container flex flex-col p-8" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col items-start justify-between gap-12 sm:flex-row sm:gap-8" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex max-w-[21rem] flex-col items-start gap-4" }, { children: [logo, (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-lg font-medium" }, { children: motto })), !!socialMediaLinks && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "m-[-0.5rem] flex" }, { children: socialMediaLinks.map(function (_a, index) {
                                        var href = _a.href, icon = _a.icon, ariaLabel = _a.ariaLabel;
                                        return ((0, jsx_runtime_1.jsx)(navigation_1.ImageAnchor, __assign({ href: href, ariaLabel: ariaLabel }, { children: (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: icon, className: "h-8 w-8 p-2" }) }), index));
                                    }) })))] })), !!sectionA && ((0, jsx_runtime_1.jsx)(FooterLinkSection_1.default, __assign({}, sectionA, { className: (0, clsx_1.default)("flex sm:hidden xl:flex", sectionA.className) }))), !!sectionB && ((0, jsx_runtime_1.jsx)(FooterLinkSection_1.default, __assign({}, sectionB, { className: (0, clsx_1.default)("flex sm:hidden xl:flex", sectionB.className) }))), !!sectionC && ((0, jsx_runtime_1.jsx)(FooterLinkSection_1.default, __assign({}, sectionC, { className: (0, clsx_1.default)("flex sm:hidden xl:flex", sectionC.className) }))), !!sponsorLinks && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "flex flex-col items-start gap-4" }, { children: sponsorLinks.map(function (_a, index) {
                                var href = _a.href, img = _a.img, ariaLabel = _a.ariaLabel;
                                return ((0, jsx_runtime_1.jsx)(navigation_1.ImageAnchor, __assign({ href: href, ariaLabel: ariaLabel }, { children: img }), index));
                            }) })))] })), (0, jsx_runtime_1.jsx)("div", { className: "text-over-primary-highest my-8 hidden border-t opacity-50 sm:block xl:hidden" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "hidden items-start justify-between gap-8 sm:flex xl:hidden" }, { children: [!!sectionA && (0, jsx_runtime_1.jsx)(FooterLinkSection_1.default, __assign({}, sectionA)), !!sectionB && (0, jsx_runtime_1.jsx)(FooterLinkSection_1.default, __assign({}, sectionB)), !!sectionC && (0, jsx_runtime_1.jsx)(FooterLinkSection_1.default, __assign({}, sectionC))] }))] })) })));
};
exports.default = Footer;
//# sourceMappingURL=Footer.js.map