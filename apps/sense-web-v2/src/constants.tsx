import { SCIENTISST_COMUNICATION_MODE } from "@scientisst/sense/future"

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