<script context="module">
	import { sendRequest } from '$lib/utils';

	const fetchPageData = async (fetch) => {
		const resp = await sendRequest(fetch, '/routelist', 'GET');

		return resp.data;
	};

	export async function load({ fetch }) {
		const pageData = await fetchPageData(fetch);

		return {
			props: {
				Permissions: pageData
			}
		};
	}
</script>

<script>
	export let Permissions = [];
</script>

<svelte:head>
	<title>Manage Permissions</title>
</svelte:head>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3"> Action Path </th>
				<th scope="col" class="px-6 py-3"> Permissions </th>
				<th scope="col" class="px-6 py-3">
					<span class="sr-only">Actions</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#if Permissions.length}
				{#each Permissions as permission}
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
						>
							{permission.api_path}
						</th>
						<td class="px-6 py-4">
							{#if permission.groups?.length}
								{#each permission.groups as group}
									<span class="bg-amber-100 px-2 m-1 rounded-md text-slate-800">{group}</span>
								{/each}
							{/if}
						</td>
						<td class="px-6 py-4 text-right">
							<a
								href="javascript:void(0)"
								class="font-medium text-indigo-600 dark:text-indigo-500 hover:underline">Edit</a
							>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
