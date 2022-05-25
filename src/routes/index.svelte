<script context="module">
  // export const load = async ({ fetch }) => {
  //   try {
  //     const response = await fetch('/query/fx-rates.json', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ currencies: ['CAD', 'GBP', 'IDR', 'INR', 'USD'] })
  //     });
  //     return {
  //       props: { ...(await response.json()) }
  //     };
  //   } catch (error) {
  //     console.error(`Error in load function for /: ${error}`);
  //   }
  // };
</script>



<svelte:head>
  <title>Home Page</title>
</svelte:head>
<h1>Welcome to SvelteKit</h1>
<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>

<a href="/about">About my site</a>
<a href="/login">Login</a>
