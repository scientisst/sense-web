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
var InputErrorMessage = function (_a) {
    var _b;
    var children = _a.children, _c = _a.center, center = _c === void 0 ? false : _c, visible = _a.visible, id = _a.id;
    return ((0, jsx_runtime_1.jsx)("span", __assign({ className: (0, clsx_1.default)("text-primary text-ellipsis", (_b = {},
            _b["text-center"] = center,
            _b["block"] = visible,
            _b["hidden"] = !visible,
            _b)), id: id, "aria-live": "polite" }, { children: children })));
};
exports.default = InputErrorMessage;
//# sourceMappingURL=index.js.map