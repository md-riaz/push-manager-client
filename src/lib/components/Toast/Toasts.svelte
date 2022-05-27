<script>
	import { flip } from 'svelte/animate';
	import Toast from './Toast.svelte';
	import { toasts } from './toastStore';
</script>

{#if $toasts.length}
	<ul>
		{#each $toasts as toast (toast.id)}
			<li animate:flip>
				<Toast {toast} />
			</li>
		{/each}
	</ul>
{/if}
