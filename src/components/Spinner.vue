<template>
	<div class="simple-spinner">
		<span></span>
	</div>
</template>

<style scoped>
.simple-spinner {
	width: 30px;
	height: 30px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

.simple-spinner span {
	display: block;
	width: 30px;
	height: 30px;
	border: 3px solid transparent;
	border-radius: 50%;
	border-right-color: #ffffff;
	animation: spinner-anime 0.8s linear infinite;
}

@keyframes spinner-anime {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
