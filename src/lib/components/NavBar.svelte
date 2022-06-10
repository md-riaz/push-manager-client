<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const closeSideBar = () => {
		dispatch('close');
	};
</script>

<nav
	class="bg-white border-b border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800 dark:border-gray-600 fixed top-0 left-0 w-full z-20"
>
	<div class="flex flex-wrap justify-between items-center">
		<div class="flex items-center dark:text-white">
			<button on:click={closeSideBar}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 mr-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
				</svg>
			</button>
			<a href="/" class="flex items-center">
				<img src="/favicon.svg" class="mr-3 h-9" alt="Brand" />
				<span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
					PUSH MANAGER
				</span>
			</a>
		</div>

		<div class="w-auto">
			<ul class="flex flex-col md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
				<li>
					<button
						type="button"
						class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
						id="user-menu-button"
						aria-expanded="false"
						data-dropdown-toggle="dropdown"
					>
						<span class="sr-only">Open user menu</span>
						<img
							class="w-8 h-8 rounded-full"
							src="https://flowbite.com/application-ui/demo/images/users/neil-sims.png"
							alt="user photo"
						/>
					</button>
				</li>
			</ul>
		</div>
	</div>
</nav>
