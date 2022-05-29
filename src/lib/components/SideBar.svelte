<script>
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	const routes = [
		{
			route: '/dashboard',
			title: 'Dashboard',
			icon: `<svg
						class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path
							d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
						/></svg
					>`
		},
		{
			route: '#',
			title: 'Administration',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
</svg>`,
			children: [
				{
					route: '/admin/users',
					title: 'Users'
				},

				{
					route: '/admin/roles',
					title: 'Roles'
				},
				{
					route: '/admin/permissions',
					title: 'Permissions'
				}
			]
		}
	];

	export let sidebarCollapsed = false;

	let showDropdown = false;

	const toggleDropdown = () => {
		showDropdown = !showDropdown;
	};
</script>

<aside
	class="{sidebarCollapsed
		? 'w-16'
		: 'w-64 overflow-y-auto'} overflow-x-hidden h-full fixed transition-[width, margin] ease-linear duration-100"
	aria-label="Sidebar"
>
	<div class="py-4 px-3 bg-gray-50  dark:bg-gray-800 min-h-screen">
		<ul class="space-y-2">
			{#each routes as item}
				<li class:active={$page.url.pathname == item.route} class="rounded-md">
					{#if item.children?.length}
						<button
							on:click={toggleDropdown}
							type="button"
							class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
						>
							{@html item.icon}

							<span
								class="ml-3 flex-1 text-left whitespace-nowrap {sidebarCollapsed ? 'hidden' : ''}"
								>{item.title}</span
							>
							<svg
								class="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/></svg
							>
						</button>

						{#if showDropdown}
							<!-- Nested menu -->
							<ul transition:slide class="py-2 space-y-2">
								{#each item.children as child}
									<li>
										<a
											href={child.route}
											class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
											>{child.title}</a
										>
									</li>
								{/each}
							</ul>
						{/if}
					{:else}
						<a
							href={item.route}
							class="flex items-center p-2 text-base font-normal text-gray-900 rounded-md dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
						>
							{@html item.icon}

							<span class="ml-3 {sidebarCollapsed ? 'hidden' : ''}">{item.title}</span>
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</aside>
