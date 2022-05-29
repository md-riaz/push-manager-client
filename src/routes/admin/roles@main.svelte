<script>
	export let Roles = [
		{
			id: 1,
			name: 'John Doe',
			total: 100
		}
	];
</script>

<svelte:head>
	<title>Manage Roles</title>
</svelte:head>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3"> Name </th>
				<th scope="col" class="px-6 py-3"> Total </th>
				<th scope="col" class="px-6 py-3">
					<span class="sr-only">Actions</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#if Roles.length}
				{#each Roles as role, index}
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
						>
							{role.name}
						</th>
						<td class="px-6 py-4"> {role.total} </td>
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
