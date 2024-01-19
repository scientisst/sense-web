<template>
	<button @click="click"><slot></slot></button>
</template>

<script>
export default {
	name: "CircularButton",
	methods: {
		click() {
			this.$emit("input")
		}
	}
}
</script>

<style scoped>
button {
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
	padding: 9px;
	-webkit-user-select: none; /* Safari */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */
	aspect-ratio: 1;
	text-transform: uppercase;
	border: none;
	margin: 3px;
}

button:hover {
	box-shadow: 0px 0px 0px 9px #f37a8455, 0px 0px 0px 6px #f1626f55,
		0px 0px 0px 3px var(--main-color);
	cursor: pointer;
}
</style>
