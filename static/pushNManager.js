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
		console.log('Unsubscribed.');
	}
}

document.querySelector('body').insertAdjacentHTML('beforeend', `<div id="pushManagerBellIcon" onclick="toggleSubscription()" style=" position: absolute; bottom: 15px; z-index: 9999999999; left: auto; right: 15px; cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 32 32" width="65" height="65"> <circle cx="16.1" cy="16" r="15.3" fill="#4f46e5"></circle> <path fill="#fff" d="M16.1 8a6 6 0 0 0-6 6v3.6l-.7.7c-.3.3-.4.7-.3 1.1.2.4.5.6.9.6h12c.4 0 .8-.2.9-.6.2-.4.1-.8-.2-1.1l-.7-.7V14c.1-3.3-2.6-6-5.9-6zm0 16a3 3 0 0 1-3-3h6a3 3 0 0 1-3 3z"></path> <circle cx="16.1" cy="16" r="12.8" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width=".8"></circle></svg></div>`);

const toggleSubscription = () => {
  let active = localStorage.getItem('pushManagerActive');

  if (active === 'true') {
    localStorage.setItem('pushManagerActive', false);
    unsubscribePush();
    alert('Unsubscribed From Notification');
  } else {
    localStorage.setItem('pushManagerActive', true);
    subscribePush();
    alert('Subscribed to Notification');
  }
}