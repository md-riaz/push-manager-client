<script>
	export let label = '';
	export let id = 'svelte' + Math.round(Math.random() * 1000);
	export let name = '';
	export let value = '';
	export let placeholder = '';
	export let rows = '3';
	export let type = 'text';
	export let required = false;

	const typeAction = (node) => {
		node.type = type;
	};
</script>

<div>
	<label for={id} class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
		{label}
	</label>
	<div class="mt-1 rounded-md shadow-sm">
		{#if type === 'textarea'}
			<textarea
				{id}
				bind:value
				{name}
				{placeholder}
				{rows}
				{required}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 focus:ring-opacity-50"
			/>
		{:else}
			<input
				{id}
				bind:value
				{name}
				use:typeAction
				{placeholder}
				{required}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 focus:ring-opacity-50"
			/>
		{/if}
	</div>
</div>
