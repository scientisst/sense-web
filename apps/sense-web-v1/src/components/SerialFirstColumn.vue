<template>
	<div class="serial-first-column">
		<div id="timestamp">
			<h3>TIMESTAMP</h3>
			<p>The first column contains a timestamp in milliseconds</p>
			<div>
				<label class="switch">
					<input type="checkbox" v-model="firstColIsTime" />
					<span class="slider"></span>
				</label>
			</div>
		</div>
		<div id="millis-micros" v-if="firstColIsTime">
			<p>What is the unit of the timestamp?</p>
			<div class="options-switch">
				<span class="option" id="option1"> millis </span>
				<label class="switch">
					<input type="checkbox" v-model="micros" />
					<span class="slider"></span>
				</label>
				<span class="option" id="option2"> micros </span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SerialFirstColumn",
	data() {
		return { firstColIsTime: false, micros: false }
	},
	mounted() {
		if (localStorage.firstColIsTime) {
			this.firstColIsTime = localStorage.firstColIsTime == "true"
		}
		if (localStorage.firstColIsTime) {
			this.micros = localStorage.micros == "true"
		}
	},
	watch: {
		firstColIsTime(newFirstColIsTime) {
			localStorage.firstColIsTime = newFirstColIsTime
		},
		micros(newMicros) {
			localStorage.micros = newMicros
		}
	}
}
</script>

<style scoped>
.switch input {
	display: none;
}

.option {
	font-weight: bold;
}

.options-switch {
	display: flex;
	justify-content: center;
	align-items: center;
}

.options-switch .slider {
	box-shadow: 0 0 0 4px var(--main-color) !important;
}

.options-switch .slider:before {
	background-color: var(--main-color);
}

.switch {
	display: inline-block;
	width: 80px; /*=w*/
	height: 40px; /*=h*/
	position: relative;
	margin: 0 10px;
}

.slider {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	border-radius: 30px;
	box-shadow: 0 0 0 4px #777;
	cursor: pointer;
	border: 4px solid transparent;
	overflow: hidden;
	transition: 0.2s;
}

.slider:before {
	position: absolute;
	content: "";
	width: 100%;
	height: 100%;
	background-color: #777;
	border-radius: 30px;
	transform: translateX(-76px); /*translateX(-(w-h))*/
	transition: 0.2s;
}

input:checked + .slider:before {
	transform: translateX(4px); /*translateX(w-h)*/
	background-color: var(--main-color);
}

input:checked + .slider {
	box-shadow: 0 0 0 4px var(--main-color);
}

p {
	color: gray;
}
</style>
