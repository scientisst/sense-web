<template>
	<div class="settings">
		<h1>Settings</h1>
		<ChannelsSelector />
	</div>
</template>

<script>
import ChannelsSelector from "./ChannelsSelector.vue"

export default {
	name: "SettingsSelector",
	components: {
		ChannelsSelector
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
