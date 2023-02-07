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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
var d3 = false;
import("d3").then(function (d3Module) {
    d3 = d3Module;
});
var defaultMargins = {
    top: 0,
    right: 0,
    bottom: 30,
    left: 50
};
var useLiveD3Chart = function (_a) {
    var className = _a.className, style = _a.style, margins = _a.margins, fontFamily = _a.fontFamily, yDomain = _a.yDomain, yTickInterval = _a.yTickInterval, yTickFormat = _a.yTickFormat;
    var _b = useState(null), chartNode = _b[0], setChartNode = _b[1];
    var _c = useState(null), parentElement = _c[0], setParentElement = _c[1];
    var _d = useState(null), canvasElement = _d[0], setCanvasElement = _d[1];
    var _e = useState(1), pixelRatio = _e[0], setPixelRatio = _e[1];
    var _f = useState(0), width = _f[0], setWidth = _f[1];
    var _g = useState(0), height = _g[0], setHeight = _g[1];
    var _h = useState([]), downsampledData = _h[0], setDownsampledData = _h[1];
    var _j = useState([]), data = _j[0], setData = _j[1];
    var _k = useState(null), downsamplerWorker = _k[0], setDownsamplerWorker = _k[1];
    var downsamplerWorkerReady = useRef(true);
    var dataLastOriginal = useRef(0);
    var dataLastDownsampled = useRef(0);
    var _l = useState(true), requiresDownsampling = _l[0], setRequiresDownsampling = _l[1];
    var lastDownsampling = useRef(0);
    var redraw = useCallback(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        if (canvasElement && d3) {
            var scaledWidth = width * pixelRatio;
            var scaledHeight = height * pixelRatio;
            d3.select(canvasElement)
                .attr("width", scaledWidth)
                .attr("height", scaledHeight);
            var context = canvasElement.getContext("2d");
            if (context) {
                var scaledMargins = {
                    top: ((_a = margins === null || margins === void 0 ? void 0 : margins.top) !== null && _a !== void 0 ? _a : defaultMargins.top) * pixelRatio,
                    right: ((_b = margins === null || margins === void 0 ? void 0 : margins.right) !== null && _b !== void 0 ? _b : defaultMargins.right) * pixelRatio,
                    bottom: ((_c = margins === null || margins === void 0 ? void 0 : margins.bottom) !== null && _c !== void 0 ? _c : defaultMargins.bottom) * pixelRatio,
                    left: ((_d = margins === null || margins === void 0 ? void 0 : margins.left) !== null && _d !== void 0 ? _d : defaultMargins.left) * pixelRatio
                };
                var plotWidth = scaledWidth - scaledMargins.left - scaledMargins.right;
                var plotHeight = scaledHeight - scaledMargins.top - scaledMargins.bottom;
                context.translate(scaledMargins.left, scaledMargins.top);
                if (downsampledData.length > 0) {
                    var X = downsampledData.map(function (_a) {
                        var x = _a[0];
                        return x;
                    });
                    var Y = downsampledData.map(function (_a) {
                        var y = _a[1];
                        return y;
                    });
                    var yDefined = Y.filter(function (y) { return y !== null; });
                    var min = Math.max(0, (_e = d3.min(X)) !== null && _e !== void 0 ? _e : 0);
                    var xDomain_1 = [min, min + 1000 * 5];
                    var xScale_1 = d3.scaleLinear(xDomain_1, [0, plotWidth]);
                    var yScale_1 = d3.scaleLinear([
                        (_g = (_f = yDomain === null || yDomain === void 0 ? void 0 : yDomain[0]) !== null && _f !== void 0 ? _f : d3.min(yDefined)) !== null && _g !== void 0 ? _g : 0,
                        (_j = (_h = yDomain === null || yDomain === void 0 ? void 0 : yDomain[1]) !== null && _h !== void 0 ? _h : d3.max(yDefined)) !== null && _j !== void 0 ? _j : 100
                    ], [plotHeight, 0]);
                    var lineWidth = 2 * pixelRatio;
                    var halfLineWidth = lineWidth / 2;
                    context.lineWidth = lineWidth;
                    var line = d3
                        .line()
                        .x(function (_a) {
                        var x = _a[0];
                        return xScale_1(x);
                    })
                        .y(function (_a) {
                        var y = _a[1];
                        return yScale_1(y !== null && y !== void 0 ? y : 0);
                    })
                        .defined(function (_a) {
                        var x = _a[0], y = _a[1];
                        return y !== null && x >= xDomain_1[0] && x <= xDomain_1[1];
                    })
                        .context(context);
                    line(downsampledData);
                    context.strokeStyle = "red";
                    context.stroke();
                    // Draw y axis
                    context.beginPath();
                    context.moveTo(-halfLineWidth, 0);
                    context.lineTo(-halfLineWidth, plotHeight + lineWidth);
                    context.strokeStyle = "black";
                    context.stroke();
                    // Draw y ticks
                    var yTicks = d3.ticks((_l = (_k = yDomain === null || yDomain === void 0 ? void 0 : yDomain[0]) !== null && _k !== void 0 ? _k : d3.min(yDefined)) !== null && _l !== void 0 ? _l : 0, (_o = (_m = yDomain === null || yDomain === void 0 ? void 0 : yDomain[1]) !== null && _m !== void 0 ? _m : d3.max(yDefined)) !== null && _o !== void 0 ? _o : 100, yTickInterval !== null && yTickInterval !== void 0 ? yTickInterval : 10);
                    context.textAlign = "right";
                    context.textBaseline = "middle";
                    context.font = "".concat(16 * pixelRatio, "px ").concat(fontFamily !== null && fontFamily !== void 0 ? fontFamily : "sans-serif");
                    for (var _i = 0, yTicks_1 = yTicks; _i < yTicks_1.length; _i++) {
                        var y = yTicks_1[_i];
                        var yScaled = yScale_1(y);
                        context.beginPath();
                        context.moveTo(-6 - halfLineWidth * pixelRatio, yScaled);
                        context.lineTo(-halfLineWidth, yScaled);
                        context.strokeStyle = "black";
                        context.stroke();
                        context.fillText(yTickFormat ? yTickFormat(y) : y.toString(), -8 * pixelRatio, yScaled);
                    }
                    // Draw x axis
                    context.beginPath();
                    context.moveTo(-lineWidth, plotHeight + halfLineWidth);
                    context.lineTo(plotWidth, plotHeight + halfLineWidth);
                    context.strokeStyle = "black";
                    context.stroke();
                    // Draw x ticks
                    var xTicks = d3.ticks(xDomain_1[0], xDomain_1[1], 5);
                    context.textAlign = "center";
                    context.textBaseline = "top";
                    context.font = "".concat(16 * pixelRatio, "px ").concat(fontFamily !== null && fontFamily !== void 0 ? fontFamily : "sans-serif");
                    for (var _p = 0, xTicks_1 = xTicks; _p < xTicks_1.length; _p++) {
                        var x = xTicks_1[_p];
                        var xScaled = xScale_1(x);
                        context.beginPath();
                        context.moveTo(xScaled, plotHeight + lineWidth);
                        context.lineTo(xScaled, plotHeight + lineWidth + 4 * pixelRatio);
                        context.strokeStyle = "black";
                        context.stroke();
                        context.fillText(x.toString(), xScaled, plotHeight + lineWidth + 8 * pixelRatio);
                    }
                }
            }
        }
    }, [
        canvasElement,
        downsampledData,
        fontFamily,
        height,
        margins,
        pixelRatio,
        width,
        yDomain,
        yTickFormat,
        yTickInterval
    ]);
    useEffect(function () {
        setRequiresDownsampling(true);
        dataLastOriginal.current = -1;
    }, [width, height, pixelRatio, margins, yDomain]);
    useEffect(function () {
        setChartNode(_jsx("div", __assign({ ref: setParentElement, className: clsx("relative", className), style: style }, { children: _jsx("canvas", { ref: setCanvasElement, className: "h-auto w-full", style: style }) })));
    }, [className, style]);
    useEffect(function () {
        var cancel = false;
        window.requestAnimationFrame(function () {
            if (!cancel) {
                redraw();
            }
        });
        return function () {
            cancel = true;
        };
    }, [redraw]);
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
    // useEffect(() => {
    // 	const worker = new Worker(
    // 		new URL("./downsamplingWorker.js", import.meta.url)
    // 	)
    // 	setDownsamplerWorker(worker)
    // 	return () => {
    // 		if (worker) {
    // 			worker.terminate()
    // 		}
    // 	}
    // }, [])
    useEffect(function () {
        if (downsamplerWorker &&
            downsamplerWorkerReady.current &&
            requiresDownsampling) {
            downsamplerWorkerReady.current = false;
            setRequiresDownsampling(false);
            var xLeftLimit_1 = data.length > 0
                ? Math.max(data[data.length - 1][0] - 1000 * 5, 0)
                : 0;
            var i = downsampledData.findIndex(function (_a) {
                var x = _a[0];
                return x >= xLeftLimit_1;
            });
            var truncatedDownsampledData_1 = __spreadArray([], downsampledData, true);
            if (i > 0) {
                truncatedDownsampledData_1.splice(0, i);
                dataLastDownsampled.current -= i;
            }
            var noData_1 = dataLastOriginal.current < 0;
            var samplesPerBucket = 3;
            downsamplerWorker.onmessage = function (event) {
                if (noData_1) {
                    setDownsampledData(event.data.downsampledData);
                }
                else {
                    setDownsampledData(__spreadArray(__spreadArray([], truncatedDownsampledData_1.slice(0, dataLastDownsampled.current), true), event.data.downsampledData.slice(1), true));
                }
                if (dataLastOriginal.current < 0) {
                    dataLastOriginal.current = 0;
                    dataLastDownsampled.current = 0;
                }
                else {
                    if (noData_1) {
                        dataLastOriginal.current += event.data.lastOriginal;
                        dataLastDownsampled.current +=
                            event.data.lastDownsampled;
                    }
                    else {
                        dataLastOriginal.current += event.data.lastOriginal - 1;
                        dataLastDownsampled.current +=
                            event.data.lastDownsampled - 1;
                    }
                }
                downsamplerWorkerReady.current = true;
            };
            if (dataLastOriginal.current <= 0 ||
                truncatedDownsampledData_1.length === 0) {
                dataLastOriginal.current = 0;
                dataLastDownsampled.current = 0;
                downsamplerWorker.postMessage({
                    data: data,
                    samplesPerBucket: samplesPerBucket
                });
            }
            else {
                downsamplerWorker.postMessage({
                    data: __spreadArray([
                        truncatedDownsampledData_1[truncatedDownsampledData_1.length - 1]
                    ], data.slice(dataLastOriginal.current), true),
                    samplesPerBucket: samplesPerBucket
                });
            }
            // const currentTime = Date.now()
            // if (currentTime - lastDownsampling.current > 100) {
            // 	lastDownsampling.current = currentTime
            // } else {
            // 	lastDownsampling.current += 100
            // 	setTimeout(work, lastDownsampling.current + 100 - currentTime)
            // }
        }
    }, [
        data,
        downsampledData,
        downsamplerWorker,
        margins,
        pixelRatio,
        requiresDownsampling,
        width
    ]);
    var setDataExport = useCallback(function (newData) {
        setData(newData);
        setRequiresDownsampling(true);
        dataLastOriginal.current = -1;
    }, []);
    var appendDataExport = useCallback(function (newData) {
        var d = __spreadArray(__spreadArray([], data, true), newData, true);
        var xLeftLimit = Math.max(d[d.length - 1][0] - 1000 * 5, 0);
        var i = data.findIndex(function (_a) {
            var x = _a[0];
            return x >= xLeftLimit;
        });
        if (i > 0) {
            d.splice(0, i);
            dataLastOriginal.current -= i;
        }
        setData(d);
        setRequiresDownsampling(true);
    }, [data]);
    return {
        chartNode: chartNode,
        setData: setDataExport,
        appendData: appendDataExport
    };
};
export default useLiveD3Chart;
//# sourceMappingURL=index.js.map