<svelte:head>
	<title>404 | Page Not Found</title>
</svelte:head>

<section class="flex min-h-screen flex-col justify-center bg-white text-center">
	<img src="./favicon.svg" alt="" class="mx-auto mb-8 max-w-max" width="60" />
	<p class="uppercase text-indigo-600">404 Error</p>
	<h3 class="my-2 text-4xl font-black">Page not found.</h3>
	<p class="text-gray-400">Sorry, we couldn't find the page you're looking for.</p>

	<a href="/" class="mt-3 flex items-center justify-center text-indigo-600">
		<span>Go back home </span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
		</svg>
	</a>
</section>
