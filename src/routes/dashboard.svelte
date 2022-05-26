<script>
	import { BASE_API_URI } from '$lib/constants';
	import { browserGet } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	let websites = [];

	const fetchData = async () => {
		const token = await browserGet('authToken');
		const req = await fetch(`${BASE_API_URI}/websites`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			method: 'GET'
		});

		const res = await req.json();

		if (res.error === 401) {
			localStorage.removeItem('authToken');
			goto('/login');
		}

		const data = res.data;

		return data;
	};

	onMount(async function () {
		const data = await fetchData();
		websites = data;
	});
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

{#each websites as item}
	<li>{item.domain}</li>
{/each}
