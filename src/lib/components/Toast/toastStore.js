import { writable } from 'svelte/store';

export const toasts = writable([]);

export function addToast(msg, type = 'default', removeAfter = 5000) {
	// create unique identifier
	const id = new Date().valueOf() + msg;

	// add toast to store
	toasts.update((allToasts) => [{ id, msg, type, removeAfter }, ...allToasts]);

	// remove toast after timeout
	setTimeout(() => removeToast(id), removeAfter);

	return id;
}

export function removeToast(id) {
	toasts.update((allToasts) => allToasts.filter((toast) => toast.id !== id));
}
