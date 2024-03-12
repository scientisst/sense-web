import { createContext, useContext, useRef } from "react"

import { Frame } from "@scientisst/sense/future"

import { ChannelList } from "../utils/ChannelList"
import { useSettings } from "./SettingsContext"

const DataContext = createContext(null)

export const useDataContext = () => {
	const context = useContext(DataContext)

	if (!context) {
		throw new Error("useDataContext must be used within a DataProvider")
	}

	return context
}

type DataProviderProps = {
	children: React.ReactNode
}

export const DataProvider = ({ children }: DataProviderProps) => {
	const { settings } = useSettings()

	const channelListRef = useRef<ChannelList>(inicializeChannelList())
	const graphBufferRef = useRef<[number, Frame][]>([])

	function inicializeChannelList() {
		const channelsNames = settings.channels

		if (channelsNames.length === 0) {
			throw new Error("No channels selected")
		}

		return ChannelList.createInstance(channelsNames)
	}

	const importFromCSV = (csv: string) => {
		//TODO: Implement this function
	}

	const addAnnotation = (pos, label) => {
		const newAnnotation = {
			name: label.name,
			color: label.color,
			pos: pos
		}

		channelListRef.current.createAnnotationAllChannels(newAnnotation)
	}

	const removeAnnotation = pos => {
		channelListRef.current.removeAnnotationAllChannels(pos)
	}

	const addInterval = () => {
		//TODO: Implement this function
	}

	const resetChannels = () => {
		if (channelListRef.current) {
			channelListRef.current.clear()
		}

		channelListRef.current = inicializeChannelList()
	}

	const saveChannels = numSegments => {
		if (numSegments === undefined || numSegments === null) {
			console.error("No segment number provided")
			return
		}

		localStorage.setItem(
			`aq_${numSegments}_channels`,
			JSON.stringify(channelListRef.current)
		)
	}

	const value = {
		channelListRef: channelListRef,
		graphBufferRef: graphBufferRef,
		addAnnotation: addAnnotation,
		removeAnnotation: removeAnnotation,
		addInterval: addInterval,
		importFromCSV: importFromCSV,
		saveChannels: saveChannels,
		resetChannels: resetChannels
	}

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
