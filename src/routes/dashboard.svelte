<script context="module">
	import SideBar from './../components/SideBar.svelte';
	import { browserRemove, sendRequest } from '$lib/utils';

	export async function load({ params, fetch, session }) {
		const [response, err] = await sendRequest(fetch, '/apps', 'GET');
		console.log('error: ', err);

		console.log(response);

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
	export let pageData;
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<SideBar />
<main class="ml-64 p-5">
	<div class="flex flex-wrap gap-4 p-3">
		{#each pageData as app, index}
			<div
				class="shadow-sm w-52 h-24 bg-indigo-200  flex justify-center items-center rounded-lg cursor-pointer"
			>
				{index}. {app.name}
			</div>
		{/each}
	</div>
</main>
