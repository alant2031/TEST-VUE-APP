<template>
	<n-card data-test="card">
		<template #cover>
			<n-image class="thumb" :src="props.thumb" :preview-disabled="true" />
		</template>
		<div class="info">
			<div class="info-title">
				<n-h3>{{ props.title }}</n-h3>
			</div>
			<div class="info-details">
				<n-button color="#c70160">DETALHES</n-button>
				<div class="info-price">
					<div class="price">
						<n-text class="normal-price" delete
							>$&nbsp;{{ props.normalPrice }}</n-text
						>
						<n-text class="sale-price">$&nbsp;{{ props.salePrice }}</n-text>
					</div>
					<div class="discount">
						<n-text>{{
							calcDiscountPercentage(props.normalPrice, props.salePrice) + '%'
						}}</n-text>
					</div>
				</div>
			</div>
		</div>
	</n-card>
</template>

<script setup>
import { NCard, NImage, NH3, NButton, NText } from 'naive-ui';
import { calcDiscountPercentage } from '@/utils';

const props = defineProps({
	title: String,
	salePrice: String,
	normalPrice: String,
	thumb: String,
});
</script>

<style scoped>
.n-card {
	background-color: #0b1641;
	width: 380px;
	border: none;
	border-radius: 8px;
	box-shadow: 0px 4px 4px 0px #00000040;
	overflow: hidden;
}

.thumb {
	height: 147px;
}

.n-h3 {
	color: white;
	font-size: 24px;
	font-weight: lighter;
}

.info-details {
	display: flex;
	justify-content: space-between;
}

.info-price {
	display: flex;
	gap: 15px;
}

.price {
	display: flex;
	flex-direction: column;
}
.n-text {
	color: white;
}

.normal-price {
	font-size: 12px;
	font-weight: lighter;
}

.sale-price {
	font-size: 18px;
	font-weight: 700;
}

.discount {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #16857b;
	height: 39px;
	width: 84px;
	border-radius: 8px;
}

.discount .n-text {
	font-size: 18px;
	font-weight: 700;
}
</style>
