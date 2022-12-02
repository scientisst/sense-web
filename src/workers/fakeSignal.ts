import downsampler from "downsample-lttb"

import ecg from "./ecg.json"

const fakeSignal = ecg.samples
// [
// 	2048, 2054, 2061, 2067, 2074, 2080, 2087, 2093, 2099, 2106, 2112, 2119,
// 	2125, 2132, 2138, 2144, 2151, 2157, 2164, 2170, 2176, 2183, 2189, 2195,
// 	2202, 2208, 2215, 2221, 2227, 2234, 2240, 2246, 2253, 2259, 2265, 2271,
// 	2278, 2284, 2290, 2296, 2303, 2309, 2315, 2321, 2328, 2334, 2340, 2346,
// 	2352, 2358, 2364, 2371, 2377, 2383, 2389, 2395, 2401, 2407, 2413, 2419,
// 	2425, 2431, 2437, 2443, 2449, 2455, 2461, 2466, 2472, 2478, 2484, 2490,
// 	2496, 2501, 2507, 2513, 2519, 2524, 2530, 2536, 2541, 2547, 2553, 2558,
// 	2564, 2569, 2575, 2580, 2586, 2591, 2597, 2602, 2608, 2613, 2618, 2624,
// 	2629, 2634, 2639, 2645, 2650, 2655, 2660, 2665, 2671, 2676, 2681, 2686,
// 	2691, 2696, 2701, 2706, 2711, 2715, 2720, 2725, 2730, 2735, 2740, 2744,
// 	2749, 2754, 2758, 2763, 2768, 2772, 2777, 2781, 2786, 2790, 2794, 2799,
// 	2803, 2808, 2812, 2816, 2820, 2825, 2829, 2833, 2837, 2841, 2845, 2849,
// 	2853, 2857, 2861, 2865, 2869, 2873, 2876, 2880, 2884, 2888, 2891, 2895,
// 	2899, 2902, 2906, 2909, 2913, 2916, 2919, 2923, 2926, 2929, 2933, 2936,
// 	2939, 2942, 2945, 2948, 2951, 2954, 2957, 2960, 2963, 2966, 2969, 2972,
// 	2975, 2977, 2980, 2983, 2985, 2988, 2990, 2993, 2995, 2998, 3000, 3002,
// 	3005, 3007, 3009, 3011, 3014, 3016, 3018, 3020, 3022, 3024, 3026, 3028,
// 	3030, 3031, 3033, 3035, 3037, 3038, 3040, 3041, 3043, 3044, 3046, 3047,
// 	3049, 3050, 3051, 3053, 3054, 3055, 3056, 3057, 3058, 3059, 3060, 3061,
// 	3062, 3063, 3064, 3065, 3065, 3066, 3067, 3067, 3068, 3069, 3069, 3070,
// 	3070, 3070, 3071, 3071, 3071, 3071, 3072, 3072, 3072, 3072, 3072, 3072,
// 	3072, 3072, 3072, 3071, 3071, 3071, 3071, 3070, 3070, 3070, 3069, 3069,
// 	3068, 3067, 3067, 3066, 3065, 3065, 3064, 3063, 3062, 3061, 3060, 3059,
// 	3058, 3057, 3056, 3055, 3054, 3053, 3051, 3050, 3049, 3047, 3046, 3044,
// 	3043, 3041, 3040, 3038, 3037, 3035, 3033, 3031, 3030, 3028, 3026, 3024,
// 	3022, 3020, 3018, 3016, 3014, 3011, 3009, 3007, 3005, 3002, 3000, 2998,
// 	2995, 2993, 2990, 2988, 2985, 2983, 2980, 2977, 2975, 2972, 2969, 2966,
// 	2963, 2960, 2957, 2954, 2951, 2948, 2945, 2942, 2939, 2936, 2933, 2929,
// 	2926, 2923, 2919, 2916, 2913, 2909, 2906, 2902, 2899, 2895, 2891, 2888,
// 	2884, 2880, 2876, 2873, 2869, 2865, 2861, 2857, 2853, 2849, 2845, 2841,
// 	2837, 2833, 2829, 2825, 2820, 2816, 2812, 2808, 2803, 2799, 2794, 2790,
// 	2786, 2781, 2777, 2772, 2768, 2763, 2758, 2754, 2749, 2744, 2740, 2735,
// 	2730, 2725, 2720, 2715, 2711, 2706, 2701, 2696, 2691, 2686, 2681, 2676,
// 	2671, 2665, 2660, 2655, 2650, 2645, 2639, 2634, 2629, 2624, 2618, 2613,
// 	2608, 2602, 2597, 2591, 2586, 2580, 2575, 2569, 2564, 2558, 2553, 2547,
// 	2541, 2536, 2530, 2524, 2519, 2513, 2507, 2501, 2496, 2490, 2484, 2478,
// 	2472, 2466, 2461, 2455, 2449, 2443, 2437, 2431, 2425, 2419, 2413, 2407,
// 	2401, 2395, 2389, 2383, 2377, 2371, 2364, 2358, 2352, 2346, 2340, 2334,
// 	2328, 2321, 2315, 2309, 2303, 2296, 2290, 2284, 2278, 2271, 2265, 2259,
// 	2253, 2246, 2240, 2234, 2227, 2221, 2215, 2208, 2202, 2195, 2189, 2183,
// 	2176, 2170, 2164, 2157, 2151, 2144, 2138, 2132, 2125, 2119, 2112, 2106,
// 	2099, 2093, 2087, 2080, 2074, 2067, 2061, 2054, 2048, 2042, 2035, 2029,
// 	2022, 2016, 2009, 2003, 1997, 1990, 1984, 1977, 1971, 1964, 1958, 1952,
// 	1945, 1939, 1932, 1926, 1920, 1913, 1907, 1901, 1894, 1888, 1881, 1875,
// 	1869, 1862, 1856, 1850, 1843, 1837, 1831, 1825, 1818, 1812, 1806, 1800,
// 	1793, 1787, 1781, 1775, 1768, 1762, 1756, 1750, 1744, 1738, 1732, 1725,
// 	1719, 1713, 1707, 1701, 1695, 1689, 1683, 1677, 1671, 1665, 1659, 1653,
// 	1647, 1641, 1635, 1630, 1624, 1618, 1612, 1606, 1600, 1595, 1589, 1583,
// 	1577, 1572, 1566, 1560, 1555, 1549, 1543, 1538, 1532, 1527, 1521, 1516,
// 	1510, 1505, 1499, 1494, 1488, 1483, 1478, 1472, 1467, 1462, 1457, 1451,
// 	1446, 1441, 1436, 1431, 1425, 1420, 1415, 1410, 1405, 1400, 1395, 1390,
// 	1385, 1381, 1376, 1371, 1366, 1361, 1356, 1352, 1347, 1342, 1338, 1333,
// 	1328, 1324, 1319, 1315, 1310, 1306, 1302, 1297, 1293, 1288, 1284, 1280,
// 	1276, 1271, 1267, 1263, 1259, 1255, 1251, 1247, 1243, 1239, 1235, 1231,
// 	1227, 1223, 1220, 1216, 1212, 1208, 1205, 1201, 1197, 1194, 1190, 1187,
// 	1183, 1180, 1177, 1173, 1170, 1167, 1163, 1160, 1157, 1154, 1151, 1148,
// 	1145, 1142, 1139, 1136, 1133, 1130, 1127, 1124, 1121, 1119, 1116, 1113,
// 	1111, 1108, 1106, 1103, 1101, 1098, 1096, 1094, 1091, 1089, 1087, 1085,
// 	1082, 1080, 1078, 1076, 1074, 1072, 1070, 1068, 1066, 1065, 1063, 1061,
// 	1059, 1058, 1056, 1055, 1053, 1052, 1050, 1049, 1047, 1046, 1045, 1043,
// 	1042, 1041, 1040, 1039, 1038, 1037, 1036, 1035, 1034, 1033, 1032, 1031,
// 	1031, 1030, 1029, 1029, 1028, 1027, 1027, 1026, 1026, 1026, 1025, 1025,
// 	1025, 1025, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1025,
// 	1025, 1025, 1025, 1026, 1026, 1026, 1027, 1027, 1028, 1029, 1029, 1030,
// 	1031, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041,
// 	1042, 1043, 1045, 1046, 1047, 1049, 1050, 1052, 1053, 1055, 1056, 1058,
// 	1059, 1061, 1063, 1065, 1066, 1068, 1070, 1072, 1074, 1076, 1078, 1080,
// 	1082, 1085, 1087, 1089, 1091, 1094, 1096, 1098, 1101, 1103, 1106, 1108,
// 	1111, 1113, 1116, 1119, 1121, 1124, 1127, 1130, 1133, 1136, 1139, 1142,
// 	1145, 1148, 1151, 1154, 1157, 1160, 1163, 1167, 1170, 1173, 1177, 1180,
// 	1183, 1187, 1190, 1194, 1197, 1201, 1205, 1208, 1212, 1216, 1220, 1223,
// 	1227, 1231, 1235, 1239, 1243, 1247, 1251, 1255, 1259, 1263, 1267, 1271,
// 	1276, 1280, 1284, 1288, 1293, 1297, 1302, 1306, 1310, 1315, 1319, 1324,
// 	1328, 1333, 1338, 1342, 1347, 1352, 1356, 1361, 1366, 1371, 1376, 1381,
// 	1385, 1390, 1395, 1400, 1405, 1410, 1415, 1420, 1425, 1431, 1436, 1441,
// 	1446, 1451, 1457, 1462, 1467, 1472, 1478, 1483, 1488, 1494, 1499, 1505,
// 	1510, 1516, 1521, 1527, 1532, 1538, 1543, 1549, 1555, 1560, 1566, 1572,
// 	1577, 1583, 1589, 1595, 1600, 1606, 1612, 1618, 1624, 1630, 1635, 1641,
// 	1647, 1653, 1659, 1665, 1671, 1677, 1683, 1689, 1695, 1701, 1707, 1713,
// 	1719, 1725, 1732, 1738, 1744, 1750, 1756, 1762, 1768, 1775, 1781, 1787,
// 	1793, 1800, 1806, 1812, 1818, 1825, 1831, 1837, 1843, 1850, 1856, 1862,
// 	1869, 1875, 1881, 1888, 1894, 1901, 1907, 1913, 1920, 1926, 1932, 1939,
// 	1945, 1952, 1958, 1964, 1971, 1977, 1984, 1990, 1997, 2003, 2009, 2016,
// 	2022, 2029, 2035, 2042
// ]

let seq = -1
let startTime = performance.now()
const readSignal = (samplingRate: number, time: number) => {
	if (startTime === 0) {
		startTime = time
	}

	const mul = 16
	const currentSeq = Math.floor(((time - startTime) * samplingRate) / 1000)
	const buffer: Array<{
		seq: number
		voltage: number
	}> = []

	while (seq < currentSeq) {
		seq += 1
		buffer.push({
			seq: seq * mul,
			voltage: fakeSignal[(seq * mul) % fakeSignal.length]
		})
	}

	return buffer
}

const frameBuffer: Array<{
	seq: number
	voltage: number
}> = []

onmessage = (
	e: MessageEvent<{
		samplingRate: number
		bufferSize: number
		downsample: number
		time: number
	}>
) => {
	const { samplingRate, bufferSize, downsample, time } = e.data
	const buffer = readSignal(samplingRate, time)

	frameBuffer.push(...buffer)
	if (frameBuffer.length > bufferSize) {
		frameBuffer.splice(0, frameBuffer.length - bufferSize)
	}

	const series = frameBuffer.map(v => [v.seq, v.voltage])

	// const ratio = Math.floor(frameBuffer.length / downsample)
	// const downsampledFrameBuffer = frameBuffer.filter(
	// 	({ seq }) => seq % ratio === 0
	// )

	const downsampledSeries = downsampler.processData(series, downsample)
	const downsampledFrameBuffer = downsampledSeries.map(v => ({
		seq: v[0],
		voltage: v[1]
	}))

	postMessage({
		buffer: downsampledFrameBuffer
	})
}

export {}