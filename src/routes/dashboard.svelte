<script context="module">
	import { sendRequest } from '$lib/utils';

	export const Load = async ({ fetch }) => {
		const [response, err] = await sendRequest(fetch, '/websites/', 'GET');

		const websites = response.data;

		if (err) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		return {
			props: { websites }
		};
	};
</script>

<script>
	export let websites;

	console.log(websites);
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<ul>
	{#each websites as website, i}
		<li>
			{i + 1}: {website.domain}
		</li>
	{/each}
</ul>
