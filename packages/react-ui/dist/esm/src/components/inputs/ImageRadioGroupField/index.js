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
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Field, useFormikContext } from "formik";
import { InputErrorMessage, InputLabel } from "../common";
var ImageRadioGroup = function (_a) {
    var field = _a.field, _b = _a.form, touched = _b.touched, errors = _b.errors, label = _a.label, center = _a.center, className = _a.className, style = _a.style, id = _a.id, options = _a.options;
    var setFieldValue = useFormikContext().setFieldValue;
    var radioRefs = useRef({});
    var _c = useState(false), inFocus = _c[0], setInFocus = _c[1];
    var hasError = !!(touched[field.name] && errors[field.name]);
    useEffect(function () {
        var onFocusListener = function (e) {
            var _a;
            if (Object.values(radioRefs.current).includes(document.activeElement)) {
                if (!inFocus) {
                    e.preventDefault();
                    setInFocus(true);
                    var currentIndex = options.findIndex(function (option) { return option.value === field.value; });
                    (_a = radioRefs.current[currentIndex !== -1 ? currentIndex : 0]) === null || _a === void 0 ? void 0 : _a.focus();
                }
            }
            else {
                setInFocus(false);
            }
        };
        addEventListener("focusin", onFocusListener);
        return function () {
            removeEventListener("focusin", onFocusListener);
        };
    }, [field.value, inFocus, options]);
    return (_jsxs("div", __assign({ role: "radiogroup", id: id, className: clsx("mb-4 flex flex-col items-stretch gap-2", className), style: style, "aria-invalid": hasError ? "true" : "false", "aria-errormessage": hasError ? "".concat(id, "-errormessage") : undefined }, { children: [_jsx(InputLabel, __assign({ center: center, htmlFor: id }, { children: label })), _jsx("div", __assign({ className: clsx("flex w-full flex-wrap items-center", center ? "justify-center" : "mx-[-1.5rem] justify-start") }, { children: options.map(function (option, index) {
                    var _a;
                    return (_jsxs("button", __assign({ role: "radio", id: "".concat(id, "-").concat(option.value), name: field.name, ref: function (ref) {
                            radioRefs.current[index] = ref;
                        }, onClick: function (e) {
                            e.preventDefault();
                            setFieldValue(field.name, option.value);
                        }, onKeyDown: function (e) {
                            if (e.key === "Space") {
                                e.preventDefault();
                                if (field.value !== option.value) {
                                    setFieldValue(field.name, option.value);
                                }
                            }
                            else if (e.key === "Enter") {
                                e.preventDefault();
                            }
                            else if (e.key === "ArrowRight" ||
                                e.key === "ArrowDown") {
                                e.preventDefault();
                                var nextIndex = (index + 1) % options.length;
                                var nextRadio = radioRefs.current[nextIndex];
                                if (nextRadio) {
                                    nextRadio.focus();
                                }
                            }
                            else if (e.key === "ArrowLeft" ||
                                e.key === "ArrowUp") {
                                e.preventDefault();
                                var previousIndex = (index - 1 + options.length) %
                                    options.length;
                                var previousRadio = radioRefs.current[previousIndex];
                                if (previousRadio) {
                                    previousRadio.focus();
                                }
                            }
                        }, className: clsx("flex flex-col items-center gap-2 py-4 px-6 font-medium uppercase motion-safe:hover:scale-hover motion-safe:active:scale-pressed", (_a = {},
                            _a["text-primary"] = field.value === option.value,
                            _a)), "aria-checked": field.value === option.value, "aria-label": option.ariaLabel }, { children: [option.img, _jsx("label", __assign({ htmlFor: "".concat(id, "-").concat(option.value) }, { children: option.name }))] }), option.value));
                }) })), _jsx(InputErrorMessage, __assign({ center: center, id: "".concat(id, "-errormessage"), visible: hasError }, { children: errors[field.name] }))] })));
};
var ImageRadioGroupField = function (props) {
    return _jsx(Field, __assign({}, props, { component: ImageRadioGroup }));
};
export default ImageRadioGroupField;
//# sourceMappingURL=index.js.map