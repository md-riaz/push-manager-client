<script>
	let showDropdown = false;

	const toggleDropdown = () => {
		showDropdown = !showDropdown;
	};
</script>

<span on:click={toggleDropdown}>
	<slot name="toggle" />
</span>

<slot name="menu" {showDropdown} />
