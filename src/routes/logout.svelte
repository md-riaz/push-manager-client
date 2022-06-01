<script context="module">
	import { browserRemove } from '$lib/utils';

	export async function load() {
		browserRemove('authToken');
		return {
			status: 302,
			redirect: '/login'
		};
	}
</script>

<script>
	import { goto } from '$app/navigation';

	goto('/login');
</script>
