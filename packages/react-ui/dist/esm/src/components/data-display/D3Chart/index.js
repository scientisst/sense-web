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
import { useEffect, useState } from "react";
import clsx from "clsx";
var D3Chart = function (_a) {
    var data = _a.data, className = _a.className, style = _a.style, svgPaintFn = _a.svgPaintFn, canvasPaintFn = _a.canvasPaintFn;
    var _b = useState(null), canvasElement = _b[0], setCanvasElement = _b[1];
    var _c = useState(null), svgElement = _c[0], setSvgElement = _c[1];
    var _d = useState(null), parentElement = _d[0], setParentElement = _d[1];
    var _e = useState(1), pixelRatio = _e[0], setPixelRatio = _e[1];
    var _f = useState(0), width = _f[0], setWidth = _f[1];
    var _g = useState(0), height = _g[0], setHeight = _g[1];
    useEffect(function () {
        var valid = true;
        if (svgElement && svgPaintFn) {
            window.requestAnimationFrame(function () {
                if (valid) {
                    svgPaintFn(svgElement, width, height, data);
                }
            });
        }
        return function () {
            valid = false;
        };
    }, [data, svgElement, svgPaintFn, width, height]);
    useEffect(function () {
        var valid = true;
        if (canvasElement && canvasPaintFn) {
            window.requestAnimationFrame(function (time) {
                if (valid) {
                    canvasPaintFn(canvasElement, width, height, pixelRatio, data, time);
                }
            });
        }
        return function () {
            valid = false;
        };
    }, [data, canvasElement, canvasPaintFn, width, height, pixelRatio]);
    useEffect(function () {
        if (parentElement) {
            setWidth(parentElement.clientWidth);
            setHeight(parentElement.clientHeight);
            var resizeObserver_1 = new ResizeObserver(function () {
                setWidth(parentElement.clientWidth);
                setHeight(parentElement.clientHeight);
            });
            resizeObserver_1.observe(parentElement);
            return function () {
                resizeObserver_1.disconnect();
            };
        }
    }, [parentElement]);
    useEffect(function () {
        setPixelRatio(window.devicePixelRatio);
        var resizeObserver = new ResizeObserver(function () {
            setPixelRatio(window.devicePixelRatio);
        });
        resizeObserver.observe(window.document.body);
        return function () {
            resizeObserver.disconnect();
        };
    }, []);
    return (_jsxs("div", __assign({ ref: setParentElement, className: clsx("relative flex flex-row items-stretch", className) }, { children: [_jsx("canvas", { ref: setCanvasElement, className: "h-auto w-full", style: style }), _jsx("svg", { ref: setSvgElement, className: "absolute h-full w-full" })] })));
};
export default D3Chart;
//# sourceMappingURL=index.js.map