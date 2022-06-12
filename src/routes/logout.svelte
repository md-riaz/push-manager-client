<script context="module">
	import { browserRemove } from '$lib/utils';
	import { isLoggedIn } from '../hooks/auth';

	export async function load() {
		browserRemove('authToken');
		isLoggedIn.set(false);
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
