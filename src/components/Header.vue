<template>
	<n-layout-header>
		<router-link to="/">
			<div class="logo" data-test="header">
				<img :src="navLogo" alt="Logo" />
			</div>
		</router-link>
	</n-layout-header>
</template>

<script setup>
import { NLayoutHeader } from 'naive-ui';
import navLogo from '@/assets/nav-logo.svg';
</script>

<style scoped>
.n-layout-header {
	position: fixed;
	background-color: #0b1641;
	height: 50px;
	z-index: 10;
}

.logo {
	position: relative;
}
.logo img {
	position: absolute;
	height: 30px;
	left: 130px;
	top: 11px;
}
</style>
