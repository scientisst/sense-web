<template>
	<h3>SAMPLING RATE</h3>
	<input
		v-model="samplingRate"
		type="number"
		class="input"
		min="1"
		max="16000"
		size="5"
	/>
</template>

<script>
export default {
	name: "SamplingRate",
	data() {
		return { samplingRate: 1000 }
	},
	mounted() {
		if (localStorage.samplingRate) {
			this.samplingRate = localStorage.samplingRate
		}
	},
	watch: {
		samplingRate(newSamplingRate) {
			if (newSamplingRate > 16000) {
				newSamplingRate = 16000
			}
			localStorage.samplingRate = newSamplingRate
			this.samplingRate = newSamplingRate
		}
	}
}
</script>

<style scoped>
*:focus {
	outline: none;
}

.input {
	border: none;
	box-shadow: 0px 0px 0px 4px var(--main-color);
	border-radius: 12px;
	text-align: center;
	font-size: 24px;
	padding: 8px;
	font-weight: bold;
	width: 6em;
}
</style>
