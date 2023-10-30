import { expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import App from '@/App.vue';
import Home from '@/components/Home.vue';
import { games, debugLog, waitDOM } from '@/tests/helpers';
import router from '@/routes';

// Setup for JSDOM issues
Element.prototype.scrollTo = vi.fn();
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});
// ----------------------

vi.mock('axios', () => ({
	default: {
		get: vi.fn(),
	},
}));

test('Should render Header', () => {
	const wrapper = mount(App, {
		global: {
			plugins: [router],
		},
	});
	const header = wrapper.find("[data-test='header']");

	expect(header.exists()).toBe(true);
	wrapper.unmount();
});

test('Should render Footer', () => {
	const wrapper = mount(App, {
		global: {
			plugins: [router],
		},
	});
	const footer = wrapper.find("[data-test='footer']");

	expect(footer.exists()).toBe(true);
	wrapper.unmount();
});

test("Should render Alert 'Server Error' if  an error is thrown", async () => {
	axios.get = vi.fn().mockRejectedValue(new Error('err'));
	const wrapper = mount(Home, {});

	await waitDOM(4);

	expect(wrapper.find("[data-test='server-error']").exists()).toBe(true);
	expect(wrapper.find("[data-test='server-error']").text()).toContain(
		'Server Error',
	);
	wrapper.unmount();
});

test("Should render Alert 'No Data' if list is empty", async () => {
	axios.get = vi.fn().mockResolvedValue({ data: [] });

	const wrapper = mount(Home, {});

	await waitDOM(4);

	expect(wrapper.find("[data-test='no-data']").exists()).toBe(true);
	expect(wrapper.find("[data-test='no-data']").text()).toContain('No Data');
	wrapper.unmount();
});

test('Should render a game card', async () => {
	axios.get = vi.fn().mockResolvedValue({ data: games });
	const wrapper = mount(Home, {});
	await waitDOM(4);
	const button = wrapper.find("[data-test='load-btn']");

	expect(button.exists()).toBe(true);

	const card = wrapper.findComponent("[data-test='card']");
	expect(card.vm.title).toBe(games[0].title);
	expect(card.vm.thumb).toBe(games[0].thumb);
	wrapper.unmount();
});

test('Should render all games after press button', async () => {
	const wrapper = mount(Home, {});
	await waitDOM(4);
	const button = wrapper.find("[data-test='load-btn']");

	await button.trigger('click');

	const cards = wrapper.findAllComponents("[data-test='card']");
	expect(cards).toHaveLength(games.length);

	for (let i = 0; i < games.length; i += 1) {
		expect(cards[i].vm.title).toBe(games[i].title);
		expect(cards[i].vm.thumb).toBe(games[i].thumb);
	}

	await waitDOM();
	expect(wrapper.find("[data-test='load-btn']").exists()).toBe(false);
	wrapper.unmount();
});

test('Should render Filter', async () => {
	const wrapper = mount(Home);
	await waitDOM(4);
	const filter = wrapper.find("[data-test='filter']");
	expect(filter.exists()).toBe(true);
	wrapper.unmount();
});

test('Should order list by search input', async () => {
	const wrapper = mount(Home, {});
	await waitDOM(4);
	const val = 'cry';

	const search = wrapper.find("[data-test='search']").find('input');

	await search.setValue(val);
	const cards = wrapper.findAllComponents("[data-test='card']");
	expect(cards).toHaveLength(1);
	const matchTitle = cards[0].vm.title.toLowerCase().startsWith(val);
	expect(matchTitle).toBe(true);
	wrapper.unmount();
});

test.skip('!-- FIX: Should order list by select input --!', async () => {
	/*

	The select component is being rendered outside the Vue instance (#app)
	It is not possible to access it.

	*/
	axios.get = vi.fn().mockResolvedValue({ data: games });

	const wrapper = mount(App, {
		global: {
			plugins: [router],
		},
	});
	await router.isReady();
	await waitDOM(4);

	const selectEl = wrapper.find("[data-test='search']").html();

	debugLog(selectEl);

	const selectBtn = wrapper.find('.n-base-selection-label');
	await selectBtn.trigger('click');

	const options = wrapper.findAll('.n-base-select-option__content');
	expect(options).toHaveLength(4);
	wrapper.unmount();
});

test("Should redirect to 'Page Not Found'", async () => {
	const wrapper = mount(App, {
		global: {
			plugins: [router],
		},
	});

	router.push('/m1j2af34n');
	await router.isReady();

	const notFound = wrapper.find("[data-test='not-found']");
	expect(notFound.exists()).toBe(true);
	expect(notFound.text()).toContain('🚫 Page Not Found');
	wrapper.unmount();
});
