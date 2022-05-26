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

export const sendRequest = async (fetch, action, method, body = {}) => {
	try {
		const url = BASE_API_URI + action;
		const headers = {};
		headers['Content-Type'] = 'application/json';
		body = JSON.stringify(body);
		const token = browserGet('authToken');
		console.log('token');
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		const req = fetch(url, {
			method,
			body,
			headers
		});

		const response = await req.json();

		if (response.error !== 0) {
			throw new Error(response.message);
		}

		return [response, null];
	} catch (e) {
		return [{}, e.message];
	}
};
