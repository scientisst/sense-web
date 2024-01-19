<template>
	<div class="top-bar">
		<a @click="$router.go(-1)"><i class="arrow"></i></a>
		<span id="title">
			{{ title }}
		</span>
		<router-link to="/">
			<img
				id="logo"
				alt="Sense logo"
				src="../assets/img/logos/SI-Sense-Vert-Col.svg"
			/>
		</router-link>
	</div>
</template>

<script>
export default {
	name: "TopBar",
	props: {
		title: {
			default: "",
			type: String
		}
	}
}
</script>

<style scoped>
.arrow {
	border: solid #ef4b59;
	border-width: 0 6px 6px 0;
	display: inline-block;
	width: 16px;
	height: 16px;
	margin-left: 16px;
	margin-right: 40px;
	transform: rotate(135deg);
	-webkit-transform: rotate(135deg);
}
.arrow:hover {
	transform: scale(1.3) rotate(135deg);
	-webkit-transform: scale(1.3) rotate(135deg);
	cursor: pointer;
}

#title {
	font-size: 1.5em;
	text-transform: uppercase;
	font-weight: bold;
	letter-spacing: 2px;
}

.top-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px;
}

#logo {
	width: 72px;
}
</style>
