import { SCIENTISST_COMUNICATION_MODE } from "@scientisst/sense/future"
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../tailwind.config"
import { useDarkTheme } from "@scientisst/react-ui/dark-theme"

const fullConfig = resolveConfig(tailwindConfig)
const lineColorLight = fullConfig.theme.colors["primary-light"]
const lineColorDark = fullConfig.theme.colors["primary-dark"]
const outlineColorLight = fullConfig.theme.colors["over-background-highest-light"]
const outlineColorDark = fullConfig.theme.colors["over-background-highest-dark"]
export interface eventProps {
	name: string,
	key: string,
	color: string,
	toogle: boolean
}

export interface settingsProps {
	deviceType: string,
	communication: number,
	baudRate: number,
	samplingRate: number,
	channels: string[],
	eventsLabel: eventProps[]
}

export interface intervalsProps {
	name: string,
	start: number,
	end: number,
	color: string
}
export interface annotationProps {
	name: string,
	color: string,
	pos: number
}

const settingsDefaultValues: settingsProps = {
	deviceType: "sense",
	communication: SCIENTISST_COMUNICATION_MODE.WEBSERIAL,
	baudRate: 9600,
	samplingRate: 1000,
	channels: ["AI1", "AI2", "AI3", "AI4", "AI5", "AI6"],
	eventsLabel: [
		{
			name: "Red",
			color: "red",
			key: "r",
			toogle: false
		},
		{
			name: "Blue",
			color: "blue",
			key: "b",
			toogle: false
		}
	]
}

export const loadSettings = (): settingsProps => {
    const settings = localStorage.getItem("settings");

    if (!settings) {
        console.log("Initialize settings with default values");
        const newSettings = settingsDefaultValues;
        localStorage.setItem("settings", JSON.stringify(newSettings)); // stringify the object

        return newSettings;
    }

    return JSON.parse(settings); // parse the stored string back to an object
};

export function chartStyle(isDark: boolean) {
	
	return {
	  className: "h-64 w-full",
	  fontFamily: "Lexend",
	  lineColor: isDark ? lineColorDark : lineColorLight,
	  outlineColor: isDark ? outlineColorDark : outlineColorLight,
	  margin: { top: 0, right: 0, bottom: 0, left: 0 }
	};
}