<script>
	import { page } from '$app/stores';

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
		}
	];
</script>

<aside class="w-64 overflow-y-auto h-full fixed" aria-label="Sidebar">
	<div class="py-4 px-3 bg-gray-50  dark:bg-gray-800 min-h-screen">
		<ul class="space-y-2">
			{#each routes as item}
				<li class:active={$page.url.pathname == item.route} class="rounded-md">
					<a
						href={item.route}
						class="flex items-center p-2 text-base font-normal text-gray-900 rounded-md dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
					>
						{@html item.icon}
						<span class="ml-3">{item.title}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</aside>
