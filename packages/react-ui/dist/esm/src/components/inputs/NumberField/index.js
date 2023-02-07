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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { Field } from "formik";
import { InputErrorMessage, InputLabel } from "../common";
var NumberInput = function (_a) {
    var field = _a.field, _b = _a.form, touched = _b.touched, errors = _b.errors, label = _a.label, _c = _a.center, center = _c === void 0 ? false : _c, className = _a.className, style = _a.style, props = __rest(_a, ["field", "form", "label", "center", "className", "style"]);
    var hasError = !!(touched[field.name] && errors[field.name]);
    return (_jsxs("div", __assign({ className: clsx("mb-4 flex flex-col items-stretch gap-2", className), style: style }, { children: [_jsx(InputLabel, __assign({ center: center, htmlFor: props.id }, { children: label })), _jsx("input", __assign({}, field, props, { type: "number", className: clsx("h-12 rounded-lg border-3 px-4 drop-shadow", "ring-primary focus:outline-none focus:ring-3 focus:ring-opacity-30 dark:focus:ring-opacity-40", "border-primary bg-background text-over-background-high placeholder:text-over-background-medium"), "aria-invalid": hasError ? "true" : "false", "aria-errormessage": hasError ? "".concat(props.id, "-errormessage") : undefined, "aria-placeholder": props.placeholder })), _jsx(InputErrorMessage, __assign({ center: center, id: "".concat(props.id, "-errormessage"), visible: hasError }, { children: errors[field.name] }))] })));
};
var NumberField = function (props) {
    return _jsx(Field, __assign({}, props, { component: NumberInput }));
};
export default NumberField;
//# sourceMappingURL=index.js.map