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
var clsx_1 = __importDefault(require("clsx"));
var formik_1 = require("formik");
var common_1 = require("../common");
var TextInput = function (_a) {
    var field = _a.field, _b = _a.form, touched = _b.touched, errors = _b.errors, label = _a.label, _c = _a.center, center = _c === void 0 ? false : _c, className = _a.className, style = _a.style, props = __rest(_a, ["field", "form", "label", "center", "className", "style"]);
    var hasError = !!(touched[field.name] && errors[field.name]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: (0, clsx_1.default)("mb-4 flex flex-col items-stretch gap-2", className), style: style }, { children: [(0, jsx_runtime_1.jsx)(common_1.InputLabel, __assign({ center: center, htmlFor: props.id }, { children: label })), (0, jsx_runtime_1.jsx)("input", __assign({}, field, props, { name: field.name, type: "text", className: (0, clsx_1.default)("h-12 rounded-lg border-3 px-4 drop-shadow", "ring-primary focus:outline-none focus:ring-3 focus:ring-opacity-30 dark:focus:ring-opacity-40", "border-primary bg-background text-over-background-high placeholder:text-over-background-medium"), "aria-invalid": hasError ? "true" : "false", "aria-errormessage": hasError ? "".concat(props.id, "-errormessage") : undefined, "aria-placeholder": props.placeholder })), (0, jsx_runtime_1.jsx)(common_1.InputErrorMessage, __assign({ center: center, id: "".concat(props.id, "-errormessage"), visible: hasError }, { children: errors[field.name] }))] })));
};
var TextField = function (props) {
    return (0, jsx_runtime_1.jsx)(formik_1.Field, __assign({}, props, { component: TextInput }));
};
exports.default = TextField;
//# sourceMappingURL=index.js.map