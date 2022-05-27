<script>
	export let label = '';
	export let id = '';
	export let value = '';
	export let placeholder = '';
	export let type = 'text';
	const typeAction = (node) => {
		node.type = type;
	};
</script>

<div>
	<label for={id} class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
		{label}
	</label>
	<div class="mt-1 rounded-md shadow-sm">
		<input
			{id}
			bind:value
			use:typeAction
			{placeholder}
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 focus:ring-opacity-50"
		/>
	</div>
</div>
