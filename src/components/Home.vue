<template>
	<Spinner v-if="isLoading" class="spin" />

	<n-alert
		v-else-if="isError"
		title="Server Error"
		data-test="server-error"
		type="error"
		>Please try again later</n-alert
	>

	<n-alert
		v-else-if="!games.length"
		title="No Data"
		data-test="no-data"
		type="warning"
	>
		Não há items para mostrar
	</n-alert>

	<div class="box" v-else>
		<Filter
			:games="games"
			:set-games-list="setGamesList"
			:set-games-to-show="setGamesToShow"
		/>

		<Flex align="center" justify="center">
			<template v-for="(_, index) in gamesToShow" :key="index">
				<Card
					v-if="!!games[index]"
					:thumb="games[index].thumb"
					:title="games[index].title"
					:normal-price="games[index].normalPrice"
					:sale-price="games[index].salePrice"
				/>
			</template>
		</Flex>
		<div
			class="btn"
			v-if="gamesToShow < games.length || games.length > gamesToShow"
		>
			<n-button color="#0b1641" @click="loadMore" data-test="load-btn"
				>Carregar mais</n-button
			>
		</div>
	</div>
</template>

<script setup>
import { NButton, NAlert } from 'naive-ui';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Filter from './Filter.vue';
import Card from '@/components/Card.vue';
import Flex from '@/components/Flex.vue';
import Spinner from '@/components/Spinner.vue';

const games = ref([]);
const isError = ref(false);
const isLoading = ref(true);

const setGamesList = (newList) => {
	games.value = newList;
};

const setGamesToShow = (num) => {
	gamesToShow.value = Math.round(num / 2);
};

const gamesToShow = ref(0);
const loadMore = () => (gamesToShow.value += 4);

const fetchData = async () => {
	try {
		const { data } = await axios.get(import.meta.env.VITE_BASE_URL);
		games.value = data;
		gamesToShow.value = games.value.length / 2;

		console.log('✔ SUCCESS');
	} catch (e) {
		console.log('❌ ERROR');
		isError.value = true;
	} finally {
		isLoading.value = false;
	}
};
onMounted(() => {
	fetchData();
});
</script>

<style scoped>
.n-h2 {
	color: azure;
}

.box {
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: 0 18px;
	margin-bottom: 24px;
	/* height: 100%; */
}

.spin {
	transform: translateY(-400px);
}
.btn {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 50px 0;
}
.n-button {
	width: 380px;
	height: 50px;
	font-size: 18px;
	font-weight: lighter;
	box-shadow: 0px 4px 4px 0px #00000040;
}
@media (max-width: 600px) {
	.box {
		margin-bottom: 120px;
	}
}
</style>
