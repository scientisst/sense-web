<template>
	<div style="height: 16px" />
	<baud-rate />
	<div style="height: 16px" />
	<serial-first-column />
</template>

<script>
import SerialFirstColumn from "@/components/SerialFirstColumn.vue"

import BaudRate from "./BaudRate.vue"

export default {
	name: "MakerSettings",
	components: {
		SerialFirstColumn,
		BaudRate
	}
}
</script>

<style scoped></style>
