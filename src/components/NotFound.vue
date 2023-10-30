<template>
	<div class="nf" data-test="not-found">
		<n-h1>🚫 Page Not Found</n-h1>
		<div></div>
	</div>
</template>

<script setup>
import { NH1 } from 'naive-ui';
</script>

<style scoped>
.nf {
	display: flex;
	justify-content: space-around;
	margin-top: 150px;
}
.n-h1 {
	color: white;
}
</style>
