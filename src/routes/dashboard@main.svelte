<script context="module">
	import Modal from '$lib/components/Modal.svelte';
	import { sendRequest } from '$lib/utils';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	// fetch new page data
	const fetchPageData = async (fetch) => {
		const resp = await sendRequest(fetch, '/apps', 'GET');

		return resp;
	};

	export async function load({ params, fetch, session }) {
		const resp = await fetchPageData(fetch);

		return {
			props: {
				pageData: resp.data
			}
		};
	}
</script>

<script>
	import { addToast } from '$lib/components/Toast/toastStore';

	export let pageData = [];

	// modal
	let showModal = false;
	const handleToggleModal = () => {
		showModal = !showModal;
	};

	let appName = '';

	const handleAppSubmit = async (e) => {
		if (appName.length === 0) {
			alert('Please enter app name');
			return;
		}

		const formData = Object.fromEntries(new FormData(e.detail.target));

		const resp = await sendRequest(fetch, '/apps', 'POST', formData);

		if (resp.error === 0) {
			// add success message
			addToast(resp.message, 'success');
			// hide modal
			handleToggleModal();
			// reset value
			appName = '';
			// fetch data
			const r = await fetchPageData(fetch);
			pageData = r.data;
		}
	};
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="flex flex-wrap gap-4 p-3">
	{#if pageData.length}
		{#each pageData as app, index}
			<a
				href="/app/{app.id}"
				class="shadow-sm w-52 h-24 bg-indigo-200  flex justify-center items-center rounded-lg"
			>
				{app.name}
			</a>
		{/each}
	{/if}

	<button
		class="shadow-sm w-52 h-24 bg-indigo-100  flex flex-col justify-center items-center rounded-lg"
		on:click={() => handleToggleModal()}
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
	</button>
</div>

<Modal
	title="Add your app or website"
	open={showModal}
	on:close={() => handleToggleModal()}
	hasForm={true}
	on:submit={handleAppSubmit}
>
	<svelte:fragment slot="body">
		<Input label="Name" name="app" bind:value={appName} />
	</svelte:fragment>

	<svelte:fragment slot="actions">
		<div class="flex gap-2 justify-end">
			<Button type="button" style="outline" label="Close" on:click={() => handleToggleModal()} />
			<Button type="submit" style="primary" label="Save" />
		</div>
	</svelte:fragment>
</Modal>
