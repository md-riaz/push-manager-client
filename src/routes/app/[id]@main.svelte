<script context="module">
	import { sendRequest } from '$lib/utils';

	const fetchPageData = async (appId, fetch) => {
		const resp = await sendRequest(fetch, '/app/' + appId + '/notifications');
		return resp;
	};

	export async function load({ params, fetch }) {
		const appId = params.id;

		const resp = await fetchPageData(appId, fetch);

		return {
			status: 200,
			props: {
				appId: appId,
				Notifications: resp.data
			}
		};
	}
</script>

<script>
	import { addToast } from '$lib/components/Toast/toastStore';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { formatDate } from '$lib/utils';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Prism from 'prismjs';

	export let Notifications = [];
	export let appId;

	// modal
	let showModal = false;
	let showSettingModal = false;

	const handleToggleModal = () => {
		showModal = !showModal;
	};

	const handleToggleSettingModal = () => {
		showSettingModal = !showSettingModal;
	};

	const handleSubmit = async (e) => {
		const formData = new FormData(e.detail.target);

		const resp = await sendRequest(fetch, '/app/' + appId + '/notifications', 'POST', formData);

		addToast(resp.message, resp.error === 0 ? 'success' : 'error');

		if (resp.error === 0) {
			handleToggleModal();
			const resp = await fetchPageData(appId, fetch);

			Notifications = resp.data;
		}
	};

	let scriptCode = '';
	if (typeof window !== 'undefined') {
		scriptCode = `
<script src="${window?.location?.origin}/pushNManager.js"></\script>
<script>
  window.pushNManager = [];
  pushNManager.app = ${appId};
</\script>`;
	}
</script>

<svelte:head>
	<title>App Notifications</title>

	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism-twilight.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex justify-between items-center mb-3 text-gray-700 dark:text-white">
	<h5 class="font-bold">Push Notifications</h5>
	<div class="flex gap-3">
		<button
			on:click={handleToggleSettingModal}
			class="rounded-md bg-blue-600 px-5 py-2 text-white shadow-sm hover:bg-blue-700 flex gap-1 items-center"
		>
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
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
				/>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			</svg>
		</button>

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
</div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3"> Name </th>
				<th scope="col" class="px-6 py-3"> Status </th>
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
						<td class="px-6 py-4"> {notification.status} </td>
						<td class="px-6 py-4">
							<time
								class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
								datetime={notification.created_at}
							>
								{formatDate(notification.created_at)}
							</time>
						</td>
						<td class="px-6 py-4 text-right">
							<Dropdown  let:showDropdown>
									<svelte:fragment slot="toggle">
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

									</svelte:fragment>

									<svelte:fragment slot="menu">
								{#if showDropdown}
								<li >
									<a
										href=""
										class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
										>Action</a
									>
								</li>
								{/if}
							</svelte:fragment>
							</Dropdown>
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
		<Input label="Name" name="name" required="true" />
		<Input label="Title" name="title" />
		<Input label="Message" name="message" type="textarea" required="true" />
		<Input label="Image" name="image" type="url" />
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

<Modal title="Settings" open={showSettingModal} on:close={() => handleToggleSettingModal()}>
	<svelte:fragment slot="body">
		<h4 class="text-xl font-bold">Step 1</h4>
		<p>Copy the code and paste it in your project head tag</p>
		<pre class="language-html" style="white-space:pre-wrap">
			<code>
				{@html Prism.highlight(scriptCode, Prism.languages['html'])}
			</code>
		</pre>

		<h4 class="text-xl font-bold">Step 2</h4>
		<p>Download the bellow file and upload them to the top-level root of your site directory.</p>
		<a href="/pushNManagerWorker.js" download class="rounded-md bg-indigo-600 px-5 py-2 text-white shadow-sm hover:bg-indigo-700 flex gap-1 items-center my-3 w-[9.2rem]">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
		</svg>
		Download
	</a>
	</svelte:fragment>

	<svelte:fragment slot="actions">
		<div class="flex gap-2 justify-end">
			<Button
				type="button"
				style="outline"
				label="Close"
				on:click={() => handleToggleSettingModal()}
			/>
		</div>
	</svelte:fragment>
</Modal>
