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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import clsx from "clsx";
import { Field, useFormikContext } from "formik";
import { InputErrorMessage, InputLabel } from "../common";
var ButtonCheckboxGroup = function (_a) {
    var field = _a.field, _b = _a.form, touched = _b.touched, errors = _b.errors, label = _a.label, className = _a.className, style = _a.style, options = _a.options, id = _a.id, center = _a.center, image = _a.image;
    var _c = useState(""), hovered = _c[0], setHovered = _c[1];
    var setFieldValue = useFormikContext().setFieldValue;
    var hasError = !!(touched[field.name] && errors[field.name]);
    var isChecked = useCallback(function (channelValue) {
        return (Array.isArray(field.value) && field.value.includes(channelValue));
    }, [field.value]);
    var toggleChannel = useCallback(function (channelValue) {
        if (isChecked(channelValue)) {
            setFieldValue(field.name, field.value.filter(function (value) { return value !== channelValue; }));
        }
        else {
            var previousValues = Array.isArray(field.value)
                ? field.value
                : [];
            setFieldValue(field.name, __spreadArray(__spreadArray([], previousValues, true), [
                channelValue
            ], false));
        }
    }, [field.name, field.value, isChecked, setFieldValue]);
    var renderedChildren = image === null || image === void 0 ? void 0 : image(hovered);
    return (_jsxs("div", __assign({ className: clsx("mb-4 flex flex-col items-stretch gap-2", className), style: style }, { children: [_jsx(InputLabel, __assign({ center: center, htmlFor: id }, { children: label })), _jsx("div", __assign({ className: clsx("flex max-w-[11rem] flex-wrap gap-4 sm:max-w-none", center ? "justify-center" : "justify-start") }, { children: options.map(function (option, index) {
                    var _a;
                    var checked = isChecked(option.value);
                    return (_jsx("button", __assign({ role: "checkbox", name: field.name, onMouseEnter: function () { return setHovered(option.value); }, onMouseLeave: function () { return setHovered(""); }, onClick: function (e) {
                            e.preventDefault();
                            toggleChannel(option.value);
                        }, onKeyDown: function (e) {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }
                            else if (e.key === "Space") {
                                e.preventDefault();
                                toggleChannel(option.value);
                            }
                        }, id: "".concat(id, "-").concat(index), className: clsx("flex h-12 min-w-[3rem] items-center justify-center rounded-full drop-shadow", "motion-safe:hover:scale-hover motion-safe:hover:drop-shadow-md motion-safe:active:scale-pressed motion-safe:active:drop-shadow-sm", "ring-primary focus:outline-none focus:ring-[3px] focus:ring-opacity-30 dark:focus:ring-opacity-40", (_a = {},
                            _a["bg-primary text-over-primary-highest"] = checked,
                            _a["border-primary bg-background text-over-background-highest border-3"] = !checked,
                            _a)), style: {
                            padding: !checked
                                ? "0 calc(1rem - 3px)"
                                : "0 1rem"
                        }, "aria-checked": checked ? "true" : "false", "aria-invalid": hasError ? "true" : "false", "aria-errormessage": hasError ? "".concat(id, "-errormessage") : undefined, "aria-label": option.ariaLabel }, { children: _jsx("label", __assign({ htmlFor: "".concat(id, "-").concat(index), className: "pointer-events-none select-none" }, { children: option.name })) }), index));
                }) })), renderedChildren && (_jsx("div", __assign({ className: clsx("flex flex-col gap-2", center ? "items-center" : "items-start") }, { children: renderedChildren }))), _jsx(InputErrorMessage, __assign({ center: center, id: "".concat(id, "-errormessage"), visible: hasError }, { children: errors[field.name] }))] })));
};
var ButtonCheckboxGroupField = function (props) {
    return _jsx(Field, __assign({}, props, { component: ButtonCheckboxGroup }));
};
export default ButtonCheckboxGroupField;
//# sourceMappingURL=index.js.map