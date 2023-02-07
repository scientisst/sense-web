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
var D3Chart = function (_a) {
    var data = _a.data, className = _a.className, style = _a.style, svgPaintFn = _a.svgPaintFn, canvasPaintFn = _a.canvasPaintFn;
    var _b = (0, react_1.useState)(null), canvasElement = _b[0], setCanvasElement = _b[1];
    var _c = (0, react_1.useState)(null), svgElement = _c[0], setSvgElement = _c[1];
    var _d = (0, react_1.useState)(null), parentElement = _d[0], setParentElement = _d[1];
    var _e = (0, react_1.useState)(1), pixelRatio = _e[0], setPixelRatio = _e[1];
    var _f = (0, react_1.useState)(0), width = _f[0], setWidth = _f[1];
    var _g = (0, react_1.useState)(0), height = _g[0], setHeight = _g[1];
    (0, react_1.useEffect)(function () {
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
    (0, react_1.useEffect)(function () {
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
    (0, react_1.useEffect)(function () {
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
    (0, react_1.useEffect)(function () {
        setPixelRatio(window.devicePixelRatio);
        var resizeObserver = new ResizeObserver(function () {
            setPixelRatio(window.devicePixelRatio);
        });
        resizeObserver.observe(window.document.body);
        return function () {
            resizeObserver.disconnect();
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ ref: setParentElement, className: (0, clsx_1.default)("relative flex flex-row items-stretch", className) }, { children: [(0, jsx_runtime_1.jsx)("canvas", { ref: setCanvasElement, className: "h-auto w-full", style: style }), (0, jsx_runtime_1.jsx)("svg", { ref: setSvgElement, className: "absolute h-full w-full" })] })));
};
exports.default = D3Chart;
//# sourceMappingURL=index.js.map