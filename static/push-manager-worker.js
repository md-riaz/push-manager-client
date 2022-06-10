console.log('Service Worker Loaded...');

self.addEventListener('push', (e) => {
	const data = e.data.json();
	console.log('Push Recieved...');

	const promiseChain = self.registration.showNotification(data.title, {
		body: data.body,
		icon: data.icon,
		data: {
			url: data.launch_url
		},
		actions: [
			{
				action: 'coffee-action',
				title: 'Coffee',
				icon: '/demos/notification-examples/images/action-1-128x128.png'
			},
			{
				action: 'doughnut-action',
				title: 'Doughnut',
				icon: '/demos/notification-examples/images/action-2-128x128.png'
			},
			{
				action: 'gramophone-action',
				title: 'gramophone',
				icon: '/demos/notification-examples/images/action-3-128x128.png'
			},
			{
				action: 'atom-action',
				title: 'Atom',
				icon: '/demos/notification-examples/images/action-4-128x128.png'
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
