<script context="module">
	import Modal from '$lib/components/Modal.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import { browserRemove, sendRequest } from '$lib/utils';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	export async function load({ params, fetch, session }) {
		const [response, err] = await sendRequest(fetch, '/apps', 'GET');
		console.log('error: ', err);

		// if error code is 401, means auth error, so redirect to login page
		if (response.error === 401) {
			browserRemove('authToken');
			return {
				status: 302,
				redirect: '/login'
			};
		}

		return {
			status: response.status,
			props: {
				pageData: response.data
			}
		};
	}
</script>

<script>
	export let pageData = [];

	let showModal = false;
	const handleToggleModal = () => {
		showModal = !showModal;
	};

	let inputval = '';
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<NavBar />
<SideBar />

<main class="ml-64 p-5">
	<div class="flex flex-wrap gap-4 p-3">
		{#each pageData as app, index}
			<div class="shadow-sm w-52 h-24 bg-indigo-200  flex justify-center items-center rounded-lg">
				{index}. {app.name}
			</div>
		{/each}

		<div
			class="shadow-sm w-52 h-24 bg-indigo-100  flex flex-col justify-center items-center rounded-lg"
		>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
				</svg>
			</span>
			Add New App
		</div>
	</div>
	{inputval}
	<button on:click={() => handleToggleModal()}>Open modal</button>
</main>

<Modal title="Edit your details" open={showModal} on:close={() => handleToggleModal()}>
	<svelte:fragment slot="body">
		<form action="#" class="space-y-6">
			<Input label="Name" bind:value={inputval} />
		</form>
	</svelte:fragment>

	<svelte:fragment slot="actions">
		<div class="flex gap-2 justify-end">
			<Button type="button" style="outline" label="Close" on:click={() => handleToggleModal()} />
			<Button type="button" style="primary" label="Save" />
		</div>
	</svelte:fragment>
</Modal>
