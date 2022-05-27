<script>
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { scale, fade } from 'svelte/transition';
	const dispatch = createEventDispatcher();

	export let open = false;
	export let title = '';
	export let hasForm = false;

	const closeModal = () => dispatch('close');

	const previously_focused = typeof document !== 'undefined' && document.activeElement;

	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}

	const handleKeydown = (e) => {
		if (e.key === 'Escape' && open) {
			closeModal();
		}
	};
</script>

<svelte:window on:keydown={handleKeydown} />
{#if open}
	<div
		transition:fade
		class="modal z-50 fixed w-full h-full top-0 left-0 flex justify-center p-8 lg:p-0"
	>
		<div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
		<div
			transition:scale
			class="bg-white dark:bg-gray-700 w-full lg:h-max lg:w-2/5 mx-auto rounded-md shadow-xl z-50 overflow-y-auto mt-40"
		>
			<div
				class="head py-5 px-8 text-lg text-gray-800 dark:text-gray-200 font-semibold flex justify-between items-center border-b border-gray-200 dark:border-gray-600"
			>
				{title}

				<button
					class="transition-colors ease-in-out duration-300 hover:bg-gray-100 dark:hover:text-gray-800 rounded-md ml-4 "
					on:click={closeModal}
				>
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						><path d="M0 0h24v24H0V0z" fill="none" /><path
							d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
						/></svg
					>
				</button>
			</div>

			{#if hasForm}
				<form
					action="#"
					class="space-y-6"
					method="post"
					on:submit|preventDefault={(e) => dispatch('submit', e)}
				>
					<div class="content px-8 py-5 bg-gray-50 dark:bg-gray-700 dark:text-white">
						<slot name="body" />
					</div>

					{#if $$slots.actions}
						<div
							class="footer px-8 py-5 bg-white dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
						>
							<slot name="actions" />
						</div>
					{/if}
				</form>
			{/if}

			{#if !hasForm}
				<div class="content px-8 py-5 bg-gray-50 dark:bg-gray-700 dark:text-white">
					<slot name="body" />
				</div>

				{#if $$slots.actions}
					<div
						class="footer px-8 py-5 bg-white dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
					>
						<slot name="actions" />
					</div>
				{/if}
			{/if}
		</div>
	</div>
{/if}
