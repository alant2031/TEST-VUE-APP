import { nextTick } from 'vue';

export const debugLog = (value) => {
	try {
		const f =
			typeof value === 'object' ? JSON.stringify(value, null, 2) : value;
		console.log('!-----------------------!');
		console.log(`| ${f} |`);
		console.log('!-----------------------!');
	} catch (e) {
		console.log('!-----------------------!');
		console.log(`| ✖ INVALID TYPE ✖ |`);
		console.log('!-----------------------!');
	}
};

export const games = [
	{
		title: 'Crypto Maze',
		salePrice: '19.06',
		normalPrice: '31.98',
		thumb: 'image1.png',
	},
	{
		title: 'Safari Hunt',
		salePrice: '19.06',
		normalPrice: '31.98',
		thumb: 'image2.png',
	},
	{
		title: 'Space Pirates',
		salePrice: '19.06',
		normalPrice: '31.98',
		thumb: 'image3.png',
	},
	{
		title: 'Ninja Dash',
		salePrice: '19.06',
		normalPrice: '31.98',
		thumb: 'image4.png',
	},
];

export const waitDOM = async (reps = 1) => {
	const ticks = [];
	for (let i = 0; i < reps; i += 1) {
		ticks.push(await nextTick());
	}
	await Promise.all(ticks);
};
