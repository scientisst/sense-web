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
var clsx_1 = __importDefault(require("clsx"));
var InputLabel = function (_a) {
    var children = _a.children, _b = _a.center, center = _b === void 0 ? false : _b, htmlFor = _a.htmlFor;
    return children ? ((0, jsx_runtime_1.jsx)("label", __assign({ className: (0, clsx_1.default)("truncate font-secondary text-2xl", center ? "text-center" : ""), htmlFor: htmlFor }, { children: children }))) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
};
exports.default = InputLabel;
//# sourceMappingURL=index.js.map