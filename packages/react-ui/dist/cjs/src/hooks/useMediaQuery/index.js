"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useMediaQuery = function (query) {
    var _a = (0, react_1.useState)(false), matches = _a[0], setMatches = _a[1];
    (0, react_1.useEffect)(function () {
        if (typeof window !== "undefined") {
            var mediaQueryList_1 = window.matchMedia(query);
            var handler_1 = function (e) { return setMatches(e.matches); };
            setMatches(mediaQueryList_1.matches);
            mediaQueryList_1.addEventListener("change", handler_1);
            return function () { return mediaQueryList_1.removeEventListener("change", handler_1); };
        }
    }, [query]);
    return matches;
};
exports.default = useMediaQuery;
//# sourceMappingURL=index.js.map