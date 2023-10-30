<template>
	<div class="filter-box" data-test="filter">
		<n-h3>Ofertas</n-h3>
		<div class="filters">
			<n-input placeholder="Procurar" @input="updateSearch" data-test="search">
				<template #prefix>
					<n-icon :component="SearchFilled" />
				</template>
			</n-input>
			<div class="select">
				<n-text>Ordernar por:</n-text>
				<n-select
					v-model:value="value"
					:options="options"
					placeholder="Selecione"
					@update:value="updateSelect"
					data-test="select"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { NIcon, NInput, NH3, NSelect, NText } from 'naive-ui';
import { SearchFilled } from '@vicons/material';
import { calcDiscountPercentage } from '@/utils';

const { games, setGamesList, setGamesToShow } = defineProps({
	games: Array,
	setGamesList: Function,
	setGamesToShow: Function,
});
const updateSearch = (e) => {
	const value = e.toUpperCase();
	const newList = games.filter((g) => {
		return g.title.toUpperCase().startsWith(value);
	});
	setGamesToShow(newList.length);
	setGamesList(newList);
};

const updateSelect = (e) => {
	if (e === 1) {
		const newList = games.sort((a, b) => {
			const a_per = calcDiscountPercentage(a.normalPrice, a.salePrice);
			const b_per = calcDiscountPercentage(b.normalPrice, b.salePrice);
			return b_per - a_per;
		});
		setGamesList(newList);
		setGamesToShow(newList.length);
	} else if (e === 2) {
		const newList = games.sort((a, b) => {
			return +b.salePrice - +a.salePrice;
		});
		setGamesList(newList);
		setGamesToShow(newList.length);
	} else if (e === 3) {
		const newList = games.sort((a, b) => {
			return +a.salePrice - +b.salePrice;
		});
		setGamesList(newList);
		setGamesToShow(newList.length);
	} else if (e === 4) {
		const newList = games.sort((a, b) => {
			return a.title.localeCompare(b.title);
		});
		setGamesList(newList);
		setGamesToShow(newList.length);
	}
};

const value = ref(null);
const options = [
	{
		label: '% de Desconto',
		value: 1,
	},
	{
		label: 'Maior preço',
		value: 2,
	},
	{
		label: 'Menor preço',
		value: 3,
	},
	{
		label: 'Título',
		value: 4,
	},
];
</script>

<style scoped>
.filter-box {
	padding: 18px 86px;
}
.n-h3 {
	font-size: 36px;
	font-weight: lighter;
	color: white;
}
.n-input {
	width: 380px;
	box-shadow: 0px 4px 4px 0px #00000040;
}

.filters {
	display: flex;
	justify-content: space-between;
}

.select {
	display: flex;
	align-items: center;
	width: 380px;
}
.n-select {
	box-shadow: 0px 4px 4px 0px #00000040;
}
.n-text {
	width: 120px;
	color: white;
	text-shadow: 0px 4px 4px 0px #00000040;
}

@media (max-width: 600px) {
	.filter-box {
		display: flex;
		flex-direction: column;
		justify-self: center;
		align-items: center;
		padding: 14px;
	}
	.n-input {
		width: 174px;
		height: 36px;
		align-self: flex-end;
	}

	.select {
		display: flex;
		flex-direction: column;
		width: 122px;
	}
	.n-select {
		height: 36px;
	}

	.filters {
		gap: 24px;
	}
}
</style>
