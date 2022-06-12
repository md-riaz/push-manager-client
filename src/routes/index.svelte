<script>
	import { isLoggedIn } from '../hooks/auth';
	console.log($isLoggedIn);
</script>

<svelte:head>
	<title>Node Push Manager</title>
</svelte:head>

<nav class="w-full border-b py-5">
	<div class="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
		<div aria-label="Home. logo" role="img">
			<img class="w-12 h-16 md:w-auto" src="./node-push.svg" alt="logo" />
		</div>

		{#if $isLoggedIn}
			<a
				href="/dashboard"
				class="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-indigo-600 hover:text-white rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm"
			>
				Dashboard
			</a>
		{:else}
			<a
				href="/login"
				class="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-indigo-600 hover:text-white rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm"
			>
				Sign In
			</a>
		{/if}
	</div>
</nav>
<div class="bg-red-500 dark:bg-transparent">
	<div class="container mx-auto flex flex-col items-center py-12 sm:py-24">
		<div class="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
			<h1
				class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10"
			>
				Node Push
				<span class="text-indigo-700">Manager </span>
			</h1>
			<p class="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
				A simple and easy to use push notification manager for the web. Free and unlimited push
				notifications for your website.
			</p>
		</div>
		<div class="flex justify-center items-center">
			<a
				href="/register"
				class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm"
				>Get Started</a
			>
		</div>
	</div>
</div>
