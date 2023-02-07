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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var link_1 = __importDefault(require("next/link"));
var clsx_1 = __importDefault(require("clsx"));
var ImageAnchor = function (_a) {
    var children = _a.children, href = _a.href, className = _a.className, ariaLabel = _a.ariaLabel, props = __rest(_a, ["children", "href", "className", "ariaLabel"]);
    return ((0, jsx_runtime_1.jsx)(link_1.default, __assign({ href: href, className: (0, clsx_1.default)("flex items-center justify-center leading-none motion-safe:hover:scale-hover motion-safe:active:scale-pressed", className), "aria-label": ariaLabel }, props, { children: children })));
};
exports.default = ImageAnchor;
//# sourceMappingURL=index.js.map