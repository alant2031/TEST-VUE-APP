<template>
	<n-layout style="height: 1500px; position: relative">
		<Header />
		<Container>
			<RouterView />
		</Container>
		<Footer />
	</n-layout>
</template>

<script setup>
import { NLayout } from 'naive-ui';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Container from './components/Container.vue';
</script>

<style scoped>
.n-layout {
	background: transparent;
	overflow: auto;
}
</style>
