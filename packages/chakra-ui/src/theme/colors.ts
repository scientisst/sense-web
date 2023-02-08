import Color from "color"

const gray = {
	50: "#f9f9fa",
	100: "#ecedf0",
	200: "#dee1e5",
	300: "#ced3d9",
	400: "#bfc4cd",
	500: "#adb3bf",
	600: "#99a0af",
	700: "#828998",
	800: "#676c79",
	900: "#3c3f46"
}

const brandGray = Object.entries(gray).reduce(
	(acc, [key, value]) => ({
		...acc,
		[key]: Color(value)
			.mix(Color("#4682f2"), 0.04 + 0.2 * (Number(key) / 1000))
			.hex()
	}),
	{}
)

const colors = {
	white: "#ffffff",
	black: "#000000",
	brand: {
		// Brand palette generated using:
		// https://smart-swatch.netlify.app/#474ce6
		light: "#4682f2",
		dark: "#474ce6",
		gray: brandGray,
		50: "#e2efff",
		100: "#b5cffe",
		200: "#87aff8",
		300: "#588ef3", // Closest to the light variant
		400: "#2c6eef",
		500: "#1455d5",
		600: "#0c42a7",
		700: "#052f78",
		800: "#001c4a",
		900: "#00091e"
	},
	// Brand gray palette generated using:
	// https://palx.jxnblk.com/
	gray,
	blue: {
		50: "#f7fafe",
		100: "#e6eefd",
		200: "#d3e1fc",
		300: "#bfd4fb",
		400: "#a9c5f9",
		500: "#8fb3f7",
		600: "#719ff5",
		700: "#4c86f2",
		800: "#3969c4",
		900: "#213e73"
	},
	indigo: {
		50: "#faf9ff",
		100: "#eeebfe",
		200: "#e2ddfd",
		300: "#d5cefc",
		400: "#c6bcfa",
		500: "#b5a9f9",
		600: "#a292f7",
		700: "#8976f5",
		800: "#684ff3",
		900: "#3c2c97"
	},
	violet: {
		50: "#fcf8ff",
		100: "#f6e9fd",
		200: "#f0d9fc",
		300: "#e9c7fb",
		400: "#e1b3fa",
		500: "#d89cf8",
		600: "#cd80f6",
		700: "#be5bf3",
		800: "#9d3cd1",
		900: "#5d247b"
	},
	fuschia: {
		50: "#fef7fd",
		100: "#fde7fa",
		200: "#fcd5f6",
		300: "#fbc1f2",
		400: "#f9aaed",
		500: "#f78ee7",
		600: "#f56ae0",
		700: "#e542cd",
		800: "#b635a2",
		900: "#6c1f60"
	},
	pink: {
		50: "#fef8fa",
		100: "#fde8f0",
		200: "#fcd7e4",
		300: "#fbc4d7",
		400: "#f9afc9",
		500: "#f896b8",
		600: "#f576a2",
		700: "#f24783",
		800: "#c03867",
		900: "#72213d"
	},
	red: {
		50: "#fef8f7",
		100: "#fde9e6",
		200: "#fcd9d3",
		300: "#fac7be",
		400: "#f9b3a6",
		500: "#f79b8b",
		600: "#f47d68",
		700: "#e75c43",
		800: "#b74935",
		900: "#6c2b1f"
	},
	orange: {
		50: "#fef9f0",
		100: "#fcecce",
		200: "#f9ddaa",
		300: "#f6cd81",
		400: "#f3bb52",
		500: "#e1a941",
		600: "#c9973a",
		700: "#ad8232",
		800: "#886627",
		900: "#503c17"
	},
	yellow: {
		50: "#f8fddc",
		100: "#e6f789",
		200: "#d4ed45",
		300: "#c7df40",
		400: "#b8cf3c",
		500: "#a9bd37",
		600: "#97a931",
		700: "#81912a",
		800: "#667221",
		900: "#3c4313"
	},
	lime: {
		50: "#f0fde9",
		100: "#cffab7",
		200: "#a5f679",
		300: "#7fec44",
		400: "#76db3f",
		500: "#6cc83a",
		600: "#60b334",
		700: "#539a2c",
		800: "#417923",
		900: "#264715"
	},
	green: {
		50: "#edfef0",
		100: "#c4fbcc",
		200: "#8ff79f",
		300: "#46f160",
		400: "#41e059",
		500: "#3bcd51",
		600: "#35b749",
		700: "#2d9d3e",
		800: "#247c31",
		900: "#15491d"
	},
	teal: {
		50: "#ebfef7",
		100: "#bdfae5",
		200: "#80f6cd",
		300: "#45edb2",
		400: "#40dca5",
		500: "#3ac997",
		600: "#34b487",
		700: "#2d9a74",
		800: "#237a5c",
		900: "#154836"
	},
	cyan: {
		50: "#effcfe",
		100: "#cdf4fb",
		200: "#a6ecf9",
		300: "#76e2f5",
		400: "#45d5ef",
		500: "#3fc3da",
		600: "#38aec3",
		700: "#3095a7",
		800: "#267684",
		900: "#16454e"
	}
}

export default colors
