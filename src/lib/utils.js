import { browser } from '$app/env';
import { BASE_API_URI } from '$lib/constants';
import { goto } from '$app/navigation';

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
	if (!browser) return [];
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
			// if body is formdata
			if (body instanceof FormData) {
				var object = {};
				body.forEach((value, key) => {
					// Reflect.has in favor of: object.hasOwnProperty(key)
					if (!Reflect.has(object, key)) {
						object[key] = value;
						return;
					}
					if (!Array.isArray(object[key])) {
						object[key] = [object[key]];
					}
					object[key].push(value);
				});

				body = JSON.stringify(object);
			} else {
				body = JSON.stringify(body);
			}

			options.body = body;
		}

		const req = await loadFetch(url, options);

		if (!req.ok) {
			throw new Error(req.statusText);
		}

		const response = await req.json();

		// if error code is 401, means auth error, so redirect to login page
		if (response.error === 401) {
			browserRemove('authToken');
			goto('/login');
		}

		return response;
	} catch (e) {
		browserRemove('authToken');
		goto('/login');
		return null;
	}
};

export const formatDate = (paramDate = new Date()) => {
	const d = new Date(paramDate);
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	const year = d.getFullYear();
	const date = d.getDate();
	const monthName = months[d.getMonth()];
	const dayName = days[d.getDay()];
	let hour = d.getHours();
	const minutes = d.getMinutes();
	let periods = 'AM';

	if (hour > 12) {
		hour = hour - 12;
		periods = 'PM';
	}

	return `${monthName} ${date}, ${year} ${hour}:${minutes} ${periods}`;
};
