"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
onmessage = function (event) {
    var _a = event.data, data = _a.data, samplesPerBucket = _a.samplesPerBucket;
    if (data.length === 0) {
        postMessage({
            downsampledData: [],
            lastOriginal: 0,
            lastDownsampled: 0
        });
        return;
    }
    var downsampledData = [];
    var segments = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i][1] === null) {
            continue;
        }
        var segmentStart = i;
        while (i < data.length && data[i][1] !== null) {
            i++;
        }
        i--;
        segments.push([segmentStart, i]);
    }
    var lastBlockStart = 0;
    var lastBlockDownsampledIndex = 0;
    if (data[0][1] === null) {
        downsampledData.push([data[0][0], null]);
        lastBlockStart = 1;
        lastBlockDownsampledIndex = 1;
    }
    for (var i = 0; i < segments.length; i++) {
        var _b = segments[i], segmentStart = _b[0], segmentEnd = _b[1];
        var segmentLength = segmentEnd - segmentStart + 1;
        downsampledData.push(data[segmentStart]);
        var buckets = Math.ceil((segmentLength - 2) / samplesPerBucket);
        if (segmentLength > 2) {
            for (var j = 0; j < buckets; j++) {
                var bucketStart = j * samplesPerBucket + segmentStart + 1;
                var bucketEnd = Math.min((j + 1) * samplesPerBucket + segmentStart, segmentEnd - 1);
                lastBlockStart = bucketStart;
                lastBlockDownsampledIndex = downsampledData.length;
                var nextBucketStart = bucketEnd + 1;
                var nextBucketEnd = Math.min((j + 2) * samplesPerBucket + segmentStart, segmentEnd);
                var previousBucketPoint = downsampledData[downsampledData.length - 1];
                var xAvg = 0;
                var yAvg = 0;
                for (var k = nextBucketStart; k <= nextBucketEnd; k++) {
                    xAvg += data[k][0];
                    yAvg += data[k][1];
                }
                xAvg /= bucketEnd - bucketStart + 1;
                yAvg /= bucketEnd - bucketStart + 1;
                var max_area = -1;
                var max_area_index = -1;
                for (var k = bucketStart; k <= bucketEnd; k++) {
                    var area = Math.abs(previousBucketPoint[0] *
                        (data[k][1] - yAvg) +
                        data[k][0] *
                            (yAvg - previousBucketPoint[1]) +
                        xAvg *
                            (previousBucketPoint[1] -
                                data[k][1]));
                    if (area > max_area) {
                        max_area_index = k;
                        max_area = area;
                    }
                }
                downsampledData.push(data[max_area_index]);
            }
        }
        if (segmentLength >= 2) {
            downsampledData.push(data[segmentEnd]);
        }
        if (i !== segments.length - 1) {
            var xAvg = 0;
            for (var k = segmentEnd + 1; k < segments[i + 1][0]; k++) {
                xAvg += data[k][0];
            }
            xAvg /= segments[i + 1][0] - segmentEnd - 1;
            downsampledData.push([xAvg, null]);
        }
    }
    if (data[data.length - 1][1] === null && data.length > 1) {
        downsampledData.push([data[data.length - 1][0], null]);
        lastBlockStart = data.length - 1;
        lastBlockDownsampledIndex = downsampledData.length - 1;
    }
    postMessage({
        downsampledData: downsampledData,
        lastOriginal: lastBlockStart,
        lastDownsampled: lastBlockDownsampledIndex
    });
};
//# sourceMappingURL=downsamplingWorker.js.map