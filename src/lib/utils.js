import { browser } from '$app/env';
import { BASE_API_URI } from '$lib/constants';

export const browserGet = (key) => {
	if (browser) {
		const item = localStorage.getItem(key);
		if (item) {
			return item;
		}
	}
	return null;
};

export const browserSet = (key, value) => {
	if (browser) {
		localStorage.setItem(key, value);
	}
};

export const browserRemove = (key) => {
	if (browser) {
		localStorage.removeItem(key);
	}
};

export const sendRequest = async (loadFetch, action, method, body = null) => {
	try {
		const url = BASE_API_URI + action;
		const headers = {};
		headers['Content-Type'] = 'application/json';
		headers['Accept'] = 'application/json';

		const token = browserGet('authToken');
		console.log('token', token);
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		const options = { method, headers };

		if (body) {
			body = JSON.stringify(body);
			options.body = body;
		}

		const req = await loadFetch(url, options);
		const response = await req.json();

		return [response, null];
	} catch (e) {
		return [{}, e.message];
	}
};
