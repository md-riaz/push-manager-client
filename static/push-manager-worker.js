console.log('Service Worker Loaded...');

self.addEventListener('push', (e) => {
	const data = e.data.json();
	console.log('Push Recieved...');

	const promiseChain = self.registration.showNotification(data.title, {
		body: data.body,
		icon: data.icon,
		image: data.image,
		data: {
			url: data.launch_url
		},
		actions: [
			{
				action: 'close',
				title: 'Close',
				icon: 'https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/close-512.png'
			}
		]
	});

	e.waitUntil(promiseChain);
});

self.addEventListener('notificationclick', function (event) {
	const clickedNotification = event.notification;

	if (event.action) {
		switch (event.action) {
			case 'close':
				console.log('Closing Notification...');
				clickedNotification.close();
				break;
		}
	}

	// Do something as the result of the notification click
	const promiseChain = clients.openWindow(event.notification.data.url);
	event.waitUntil(promiseChain);
});
