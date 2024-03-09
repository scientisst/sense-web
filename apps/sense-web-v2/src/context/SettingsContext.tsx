import { createContext, useContext, useState } from "react"

import { SCIENTISST_COMUNICATION_MODE } from "@scientisst/sense/future"

type Event = {
	name: string
	key: string
	color: string
	toggle: "true" | "false"
}

type Settings = {
	deviceType: string
	communication: number
	baudRate: number
	samplingRate: number
	channels: string[]
	eventsLabel: Event[]
}

const defaultSettings: Settings = {
	deviceType: "sense",
	communication: SCIENTISST_COMUNICATION_MODE.WEBSERIAL,
	baudRate: 9600,
	samplingRate: 1000,
	channels: ["AI1", "AI2", "AI3", "AI4", "AI5", "AI6"],
	eventsLabel: [
		{
			name: "Red",
			color: "rgb(255, 0, 0)",
			key: "r",
			toggle: "true"
		},
		{
			name: "Blue",
			color: "rgb(0, 0, 255)",
			key: "b",
			toggle: "false"
		}
	]
}

const loadSettings = (): Settings => {
	const settings = localStorage.getItem("settings")

	if (settings === null) {
		return defaultSettings
	}

	return JSON.parse(settings)
}

const SettingsContext = createContext(null)

export const useSettings = () => {
	const context = useContext(SettingsContext)

	if (!context) {
		throw new Error("useSettings must be used within a SettingsProvider")
	}

	return context
}

type SettingsProviderProps = {
	children: React.ReactNode
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
	const [settings, setSettings] = useState<Settings>(loadSettings())

	const updateSettings = (newSettings: Settings) => {
		setSettings(newSettings)
		localStorage.setItem("settings", JSON.stringify(newSettings))
	}

	const value = {
		settings: settings,
		updateSettings: updateSettings
	}

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	)
}
