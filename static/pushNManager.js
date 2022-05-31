const BASE_API_URI = 'http://localhost:3001/api';
const publicVapidKey =
	'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo';

function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

// subscribe the user to the push service
const subscribePush = async () => {
	if ('serviceWorker' in navigator) {
		send().catch((err) => console.error(err));
	}
};

// unsubscribe the user from the push service
const unsubscribePush = async () => {
	if ('serviceWorker' in navigator) {
		unsubscribe().catch((err) => console.error(err));
	}
};

// Register SW, Register Push, Send Push
async function send() {
	if (window.pushNManager.app === undefined) {
		return;
	}

	// Register Service Worker
	console.log('Registering service worker...');
	const register = await navigator.serviceWorker.register('/push-manager-worker.js', {
		scope: '/'
	});
	console.log('Service Worker Registered...');

	// Register Push
	console.log('Registering Push...');
	const subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
	});

	console.log('Push Registered...');

	// Send Push Notification
	console.log('Sending Push...');
	await fetch(`${BASE_API_URI}/subscription`, {
		method: 'POST',
		body: JSON.stringify({
			subscription: JSON.stringify(subscription),
			app_id: window.pushNManager.app
		}),
		headers: {
			'content-type': 'application/json'
		}
	});
	console.log('Push Sent...');
}

// Unregister SW, Unregister Push
async function unsubscribe() {
	const registration = await navigator.serviceWorker.ready;
	const subscription = await registration.pushManager.getSubscription();

	if (!subscription) {
		console.log('No subscription to unsubscribe.');
		return;
	}

	const { endpoint } = subscription;
	const response = await fetch(`${BASE_API_URI}/subscription?endpoint=${endpoint}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json'
		}
	});

	if (response.ok) {
		await subscription.unsubscribe();
	}
}
