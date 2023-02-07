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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import clsx from "clsx";
var InputLabel = function (_a) {
    var children = _a.children, _b = _a.center, center = _b === void 0 ? false : _b, htmlFor = _a.htmlFor;
    return children ? (_jsx("label", __assign({ className: clsx("truncate font-secondary text-2xl", center ? "text-center" : ""), htmlFor: htmlFor }, { children: children }))) : (_jsx(_Fragment, {}));
};
export default InputLabel;
//# sourceMappingURL=index.js.map