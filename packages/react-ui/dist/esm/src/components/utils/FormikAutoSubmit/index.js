import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useFormikContext } from "formik";
import { useDebounce } from "../../../hooks";
var FormikAutoSubmit = function (_a) {
    var delay = _a.delay;
    var _b = useFormikContext(), values = _b.values, submitForm = _b.submitForm;
    var debouncedValues = useDebounce(values, delay);
    useEffect(function () {
        submitForm();
    }, [debouncedValues, submitForm]);
    return _jsx(_Fragment, {});
};
export default FormikAutoSubmit;
//# sourceMappingURL=index.js.map