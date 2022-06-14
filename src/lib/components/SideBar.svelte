<script>
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import Dropdown from './Dropdown.svelte';
	import { user } from '../../hooks/auth';

	const routes = [
		{
			route: '/dashboard',
			roles: ['Admin', 'User'],
			title: 'Dashboard',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
</svg>`
		},
		{
			route: '#',
			roles: ['Admin'],
			title: 'Administration',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>`,
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
		},
		{
			route: '/logout',
			roles: ['Admin', 'User'],
			title: 'Logout',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>`
		}
	];

	export let sidebarCollapsed = false;
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
				{#if item.roles.includes($user.group)}
					<li class:active={$page.url.pathname == item.route} class="rounded-md">
						{#if item.children?.length}
							<Dropdown let:showDropdown>
								<svelte:fragment slot="toggle">
									<button
										type="button"
										class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>
										{@html item.icon}

										<span
											class="ml-3 flex-1 text-left whitespace-nowrap {sidebarCollapsed
												? 'hidden'
												: ''}">{item.title}</span
										>
										<svg
											class="w-6 h-6 {sidebarCollapsed ? 'hidden' : ''}"
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
								</svelte:fragment>

								<svelte:fragment slot="menu">
									{#if showDropdown}
										<!-- Nested menu -->
										<ul transition:slide class="py-2 space-y-2">
											{#each item.children as child}
												<li class:active={$page.url.pathname == child.route}>
													<a
														href={child.route}
														class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
														>{child.title}</a
													>
												</li>
											{/each}
										</ul>
									{/if}
								</svelte:fragment>
							</Dropdown>
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
				{/if}
			{/each}
		</ul>
	</div>
</aside>
