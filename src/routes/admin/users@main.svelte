<script>
	export let Users = [
		{
			id: 1,
			name: 'John Doe',
			email: 'john.doe@gmail.com',
			phone: '+91-123-456-7890',
			role: 'Admin',
			status: 1,
			created_at: '2020-01-01'
		}
	];
</script>

<svelte:head>
	<title>Manage Users</title>
</svelte:head>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
	<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3"> Name </th>
				<th scope="col" class="px-6 py-3"> Email </th>
				<th scope="col" class="px-6 py-3"> Phone </th>
				<th scope="col" class="px-6 py-3"> Role </th>
				<th scope="col" class="px-6 py-3"> Status </th>
				<th scope="col" class="px-6 py-3"> Created </th>
				<th scope="col" class="px-6 py-3">
					<span class="sr-only">Actions</span>
				</th>
			</tr>
		</thead>
		<tbody>
			{#if Users.length}
				{#each Users as user, index}
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
					>
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
						>
							{user.name}
						</th>
						<td class="px-6 py-4"> {user.email} </td>
						<td class="px-6 py-4"> {user.phone} </td>
						<td class="px-6 py-4"> {user.role} </td>
						<td class="px-6 py-4">
							{#if user.status == 1}
								<span class="text-green-500"
									><svg
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
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg></span
								>
							{:else}
								<span class="text-red-500">
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
											d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</span>
							{/if}
						</td>
						<td class="px-6 py-4"> {user.created_at} </td>
						<td class="px-6 py-4 text-right">
							<a href="#" class="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
								>Edit</a
							>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
