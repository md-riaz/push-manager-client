<script>
	import Toasts from '$lib/components/Toast/Toasts.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import '../app.css';

	import { onMount } from 'svelte';

	let sidebarCollapsed = false;
	const collapseSidebar = () => {
		sidebarCollapsed = !sidebarCollapsed;
	};

	let matches = false;
	let mql;
	let mqlListener;
	let wasMounted = false;
	let query = '(max-width: 990px)';

	onMount(() => {
		wasMounted = true;
		return () => {
			removeActiveListener();
		};
	});

	$: {
		if (wasMounted) {
			removeActiveListener();
			addNewListener(query);
		}
	}
	function addNewListener(query) {
		mql = window.matchMedia(query);
		mqlListener = (v) => (matches = v.matches);
		mql.addListener(mqlListener);
		matches = mql.matches;
	}

	function removeActiveListener() {
		if (mql && mqlListener) {
			mql.removeListener(mqlListener);
		}
	}

	$: matches ? (sidebarCollapsed = true) : (sidebarCollapsed = false);
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
