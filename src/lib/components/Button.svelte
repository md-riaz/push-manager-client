<script>
	import { createEventDispatcher } from 'svelte';

	export let style = 'primary';
	export let type = 'button';
	export let label = '';

	const dispatch = createEventDispatcher();

	const onClick = () => {
		dispatch('click');
	};

	let classes = 'font-medium border px-5 py-2.5 rounded-md text-sm border ';

	switch (style) {
		case 'primary':
			classes +=
				'bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white';
			break;

		case 'outline':
		default:
			classes +=
				'bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-500 dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 text-gray-500';
			break;
	}
</script>

<button {type} class={classes} on:click={onClick}>{label}</button>
