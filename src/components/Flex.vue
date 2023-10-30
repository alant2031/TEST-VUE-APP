<template>
	<div
		class="flex-box"
		:style="`flex-direction: ${direction}; justify-content: ${justify}; align-items: ${align};`"
	>
		<slot></slot>
	</div>
</template>

<script setup>
const {
	direction = 'row',
	justify,
	align,
} = defineProps({
	direction: String,
	justify: String,
	align: String,
});
</script>

<style scoped>
.flex-box {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}
</style>
