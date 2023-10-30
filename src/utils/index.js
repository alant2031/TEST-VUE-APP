export function calcDiscountPercentage(normalPrice, salePrice) {
	if (+normalPrice <= 0 || +salePrice <= 0) {
		return '0%';
	}

	const discount = +normalPrice - +salePrice;
	const discountPercentage = (discount / +normalPrice) * 100;
	// console.log(discountPercentage);

	return Math.round(discountPercentage);
}
