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
var react_1 = require("react");
var clsx_1 = __importDefault(require("clsx"));
var sizeToClassName = {
    base: "h-12 px-6 text-base drop-shadow-md motion-safe:hover:drop-shadow-lg motion-safe:active:drop-shadow",
    lg: "h-16 px-9 text-lg drop-shadow-lg motion-safe:hover:drop-shadow-xl motion-safe:active:drop-shadow-md"
};
var TextButton = (0, react_1.forwardRef)(function (_a, ref) {
    var children = _a.children, size = _a.size, className = _a.className, disabled = _a.disabled, props = __rest(_a, ["children", "size", "className", "disabled"]);
    return ((0, jsx_runtime_1.jsx)("button", __assign({ className: (0, clsx_1.default)("flex items-center justify-center rounded-lg font-medium uppercase", "motion-safe:hover:scale-hover motion-safe:active:scale-pressed", "bg-primary text-over-primary-highest", {
            "pointer-events-none opacity-50": disabled
        }, sizeToClassName[size], className), ref: ref, disabled: disabled }, props, { children: children })));
});
TextButton.displayName = "TextButton";
exports.default = TextButton;
//# sourceMappingURL=index.js.map