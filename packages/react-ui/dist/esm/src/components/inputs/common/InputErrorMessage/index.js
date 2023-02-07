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
import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
var InputErrorMessage = function (_a) {
    var _b;
    var children = _a.children, _c = _a.center, center = _c === void 0 ? false : _c, visible = _a.visible, id = _a.id;
    return (_jsx("span", __assign({ className: clsx("text-primary text-ellipsis", (_b = {},
            _b["text-center"] = center,
            _b["block"] = visible,
            _b["hidden"] = !visible,
            _b)), id: id, "aria-live": "polite" }, { children: children })));
};
export default InputErrorMessage;
//# sourceMappingURL=index.js.map