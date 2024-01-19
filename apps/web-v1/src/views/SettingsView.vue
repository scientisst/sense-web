<template>
	<div class="settings">
		<top-bar title="Sense Settings" />
		<!-- communication mode: BTH vs WiFi -->
		<device-select v-on:device="onDeviceChanged" />
		<div style="height: 16px" />
		<!-- Show settings for ScientISST Sense -->
		<div v-if="device == 0">
			<sense-settings />
		</div>
		<!-- Show settings for ScientISST Maker -->
		<div v-else-if="device == 1">
			<maker-settings />
		</div>
		<div style="height: 32px" />
	</div>
</template>

<script>
import DeviceSelect from "../components/DeviceSelect.vue"
import MakerSettings from "../components/MakerSettings.vue"
import SenseSettings from "../components/SenseSettings.vue"
import TopBar from "../components/TopBar.vue"

export default {
	name: "SettingsView",
	components: {
		TopBar,
		DeviceSelect,
		SenseSettings,
		MakerSettings
	},
	data() {
		return {
			device: 0
		}
	},
	created() {
		// load lastly defined device
		if (localStorage.device) {
			this.device = parseInt(localStorage.device)
		}
	},
	methods: {
		onDeviceChanged(event) {
			this.device = event
		}
	}
}
</script>
