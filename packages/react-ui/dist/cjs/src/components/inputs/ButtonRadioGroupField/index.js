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
var react_1 = require("react");
var clsx_1 = __importDefault(require("clsx"));
var formik_1 = require("formik");
var common_1 = require("../common");
var ButtonRadioGroup = function (_a) {
    var field = _a.field, _b = _a.form, touched = _b.touched, errors = _b.errors, label = _a.label, center = _a.center, className = _a.className, style = _a.style, options = _a.options, id = _a.id;
    var setFieldValue = (0, formik_1.useFormikContext)().setFieldValue;
    var radioRefs = (0, react_1.useRef)({});
    var _c = (0, react_1.useState)(false), inFocus = _c[0], setInFocus = _c[1];
    var hasError = !!(touched[field.name] && errors[field.name]);
    (0, react_1.useEffect)(function () {
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
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ role: "radiogroup", className: (0, clsx_1.default)("mb-4 flex flex-col items-stretch gap-2", className), style: style, "aria-invalid": hasError ? "true" : "false", "aria-errormessage": hasError ? "".concat(id, "-errormessage") : undefined }, { children: [(0, jsx_runtime_1.jsx)(common_1.InputLabel, __assign({ center: center, htmlFor: id }, { children: label })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "border-primary bg-background text-over-background-highest flex h-12 justify-center rounded-lg border-3 drop-shadow" }, { children: options.map(function (option, index) {
                    var _a;
                    return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [index !== 0 && ((0, jsx_runtime_1.jsx)("div", { className: "background-primary w-[1px] opacity-50" })), (0, jsx_runtime_1.jsx)("button", __assign({ role: "radio", ref: function (ref) {
                                    radioRefs.current[index] = ref;
                                }, id: "".concat(id, "-").concat(option.value), name: field.name, className: (0, clsx_1.default)("flex flex-grow items-center justify-center py-2 px-4 font-medium", (_a = {},
                                    _a["bg-primary text-over-primary-highest"] = field.value === option.value,
                                    _a)), onClick: function (e) {
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
                                }, "aria-checked": field.value === option.value, "aria-label": option.ariaLabel }, { children: (0, jsx_runtime_1.jsx)("label", __assign({ htmlFor: "".concat(id, "-").concat(option.value), className: "pointer-events-none select-none" }, { children: option.name })) }))] }, option.value));
                }) })), (0, jsx_runtime_1.jsx)(common_1.InputErrorMessage, __assign({ center: center, id: "".concat(id, "-errormessage"), visible: hasError }, { children: errors[field.name] }))] })));
};
var ButtonRadioGroupField = function (props) {
    return (0, jsx_runtime_1.jsx)(formik_1.Field, __assign({}, props, { component: ButtonRadioGroup }));
};
exports.default = ButtonRadioGroupField;
//# sourceMappingURL=index.js.map