<script>
	import Toasts from '$lib/components/Toast/Toasts.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import '../app.css';

	let sidebarCollapsed = false;
	const collapseSidebar = () => {
		sidebarCollapsed = !sidebarCollapsed;
	};
</script>

<NavBar on:close={collapseSidebar} />
<SideBar {sidebarCollapsed} />

<main
	class="{sidebarCollapsed
		? 'ml-16'
		: 'ml-64'} mt-14 p-5 min-h-[calc(100vh_-_57px)] dark:bg-gray-900 transition-[width, margin] ease-linear duration-100"
>
	<slot />
</main>

<Toasts />
