<script context="module">
	import { sendRequest } from '$lib/utils';

	export async function load({ params, fetch }) {
		const appId = params.id;

		return {
			status: 200,
			props: {
				appId: appId
			}
		};
	}
</script>

<script>
	import { addToast } from '$lib/components/Toast/toastStore';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	export let Notifications = [];
	export let appId;

	// modal
	let showModal = false;
	const handleToggleModal = () => {
		showModal = !showModal;
	};

	const handleSubmit = async (e) => {
		const formData = new FormData(e.detail.target);

		const [response, err] = await sendRequest(
			fetch,
			'/app/' + appId + '/notifications',
			'POST',
			formData
		);

		addToast(response.message, 'success');
	};
</script>

<svelte:head>
	<title>App Notifications</title>
</svelte:head>

<div class="flex justify-between items-center mb-3 text-gray-700 dark:text-white">
	<h5 class="font-bold">Push Notifications</h5>
	<button
		on:click={handleToggleModal}
		class="rounded-md bg-indigo-600 px-5 py-2 text-white shadow-sm hover:bg-indigo-700 flex gap-1 items-center"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		New Message
	</button>
</div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3"> Name </th>
				<th scope="col" class="px-6 py-3"> Sent </th>
				<th scope="col" class="px-6 py-3"> Created </th>
				<th scope="col" class="px-6 py-3">
					<span class="sr-only">Actions</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#if Notifications.length}
				{#each Notifications as notification, index}
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
						>
							{notification.name}
						</th>
						<td class="px-6 py-4"> {notification.sent} </td>
						<td class="px-6 py-4">
							<time
								class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
								datetime={notification.created}
							>
								{notification.created}
							</time>
						</td>
						<td class="px-6 py-4 text-right">
							<button>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
									/>
								</svg>
							</button>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<Modal
	title="New Push Notification"
	open={showModal}
	on:close={() => handleToggleModal()}
	hasForm={true}
	on:submit={handleSubmit}
>
	<svelte:fragment slot="body">
		<Input label="Name" name="name" />
		<Input label="Title" name="title" />
		<Input label="Message" name="message" type="textarea" required="true" />
		<Input label="Image" name="image" />
		<Input label="Launch URL" name="launch_url" type="url" />
		<div class="grid grid-cols-2 gap-3">
			<Input label="Schedule" name="schedule" type="date" />
			<Input label="Time" name="time" type="time" />
		</div>
	</svelte:fragment>

	<svelte:fragment slot="actions">
		<div class="flex gap-2 justify-end">
			<Button type="button" style="outline" label="Close" on:click={() => handleToggleModal()} />
			<Button type="submit" style="primary" label="Send" />
		</div>
	</svelte:fragment>
</Modal>
