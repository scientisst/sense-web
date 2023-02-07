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
var link_1 = __importDefault(require("next/link"));
var clsx_1 = __importDefault(require("clsx"));
var FooterLinkSection = function (_a) {
    var title = _a.title, links = _a.links, className = _a.className, style = _a.style;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: (0, clsx_1.default)("mt-[-0.75rem] flex flex-col items-start gap-2", className), style: style }, { children: [(0, jsx_runtime_1.jsx)("h4", __assign({ className: "mb-2 font-secondary text-2xl" }, { children: title })), links.map(function (_a, index) {
                var href = _a.href, label = _a.label;
                return ((0, jsx_runtime_1.jsx)(link_1.default, __assign({ href: href, className: "text-over-primary-highest motion-safe:hover:scale-hover motion-safe:active:scale-pressed" }, { children: label }), index));
            })] })));
};
exports.default = FooterLinkSection;
//# sourceMappingURL=FooterLinkSection.js.map