import { useEffect, useState } from "react";
var useMediaQuery = function (query) {
    var _a = useState(false), matches = _a[0], setMatches = _a[1];
    useEffect(function () {
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
export default useMediaQuery;
//# sourceMappingURL=index.js.map