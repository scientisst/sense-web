<template>
	<div class="toggle-button">
		<input type="checkbox" :id="'toggle-button-' + id" v-model="checked" />
		<label :for="'toggle-button-' + id">
			<p>
				<slot></slot>
			</p>
		</label>
	</div>
</template>

<script>
const uniqueId = require("lodash.uniqueid")
export default {
	name: "ToggleButton",
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			checked: undefined,
			id: uniqueId()
		}
	},
	watch: {
		value() {
			this.checked = this.value
		},
		checked() {
			// `If` is only here for testing purposes
			this.$emit("input", this.checked)
		}
	},
	created() {
		this.checked = this.value
	}
}
</script>

<style scoped>
.toggle-button input {
	display: none;
}

.toggle-button input[type="checkbox"]:checked + label {
	background-color: var(--main-color);
	color: white;
}

.toggle-button label {
	text-transform: uppercase;
	display: inline-flex;
	min-width: 1.2em;
	align-items: center;
	justify-content: center;
	background-color: #fff;
	color: var(--main-color);
	border-radius: 50%;
	text-align: center;
	font-weight: bold;
	box-shadow: 0px 0px 0px 3px var(--main-color);
	padding: 6px;
	-webkit-user-select: none; /* Safari */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */
	aspect-ratio: 1;
	margin: 3px;
}

label p {
	margin: 0;
}

.toggle-button label:hover {
	box-shadow: 0px 0px 0px 9px #f37a8455, 0px 0px 0px 6px #f1626f55,
		0px 0px 0px 3px var(--main-color);
	cursor: pointer;
}
</style>
