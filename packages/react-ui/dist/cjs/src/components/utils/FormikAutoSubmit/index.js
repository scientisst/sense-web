"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var formik_1 = require("formik");
var hooks_1 = require("../../../hooks");
var FormikAutoSubmit = function (_a) {
    var delay = _a.delay;
    var _b = (0, formik_1.useFormikContext)(), values = _b.values, submitForm = _b.submitForm;
    var debouncedValues = (0, hooks_1.useDebounce)(values, delay);
    (0, react_1.useEffect)(function () {
        submitForm();
    }, [debouncedValues, submitForm]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
};
exports.default = FormikAutoSubmit;
//# sourceMappingURL=index.js.map