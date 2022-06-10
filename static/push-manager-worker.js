console.log('Service Worker Loaded...');

self.addEventListener('push', (e) => {
	const data = e.data.json();
	console.log('Push Recieved...');

	const promiseChain = self.registration.showNotification(data.title, {
		body: data.body,
		icon: data.icon
	});

	e.waitUntil(promiseChain);
});

self.addEventListener('notificationclick', function (event) {
	const clickedNotification = event.notification;
	clickedNotification.close();
	console.log(event);
	// Do something as the result of the notification click
	// const promiseChain = doSomething();
	// event.waitUntil(promiseChain);
});
