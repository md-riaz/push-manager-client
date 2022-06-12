<script context="module">
	import { browserGet } from '$lib/utils';

	export const load = () => {
		// if has auth token then redirect to dashboard
		if (browserGet('authToken')) {
			return {
				status: 302,
				redirect: '/dashboard'
			};
		}

		return {
			status: 200,
			props: {}
		};
	};
</script>

<script>
	import { goto } from '$app/navigation';
	import Spinner from '$lib/components/spinner.svelte';
	import { BASE_API_URI } from '$lib/constants';
	import { addToast } from '$lib/components/Toast/toastStore';

	let name,
		phone,
		email,
		password,
		requesting = false;

	const API_ENDPOINT = `${BASE_API_URI}/auth/register`;

	const handleSubmit = async () => {
		try {
			requesting = true;
			const req = await fetch(API_ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					phone,
					email,
					password
				})
			});

			if (!req.ok) {
				throw new Error(req.statusText);
			}

			const res = await req.json();

			if (res.error === 0) {
				goto('/login');
			} else {
				addToast(res.message, 'error');
			}
		} catch (e) {
			addToast(e.message, 'error');
		} finally {
			requesting = false;
		}
	};
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<section class="grid md:grid-cols-2">
	<a href="/" class="hidden bg-indigo-600 md:flex min-h-screen flex-col justify-center">
		<img src="./node-push.svg" alt="" width="300" class="mx-auto" />
	</a>
	<div class="flex min-h-screen flex-col justify-center bg-white">
		<div class="mx-auto w-full max-w-[30rem] px-10">
			<img src="./node-push.svg" alt="" width="200" class="md:hidden" />
		</div>
		<div class="mx-auto w-full max-w-[30rem] p-10">
			<form action="" method="post" on:submit|preventDefault={handleSubmit}>
				<h4 class="mb-14 text-2xl font-bold capitalize">Register an account</h4>

				<div class="my-6">
					<label for="name" class="font-bold">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						bind:value={name}
						required
						maxlength="50"
						class="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
					/>
				</div>

				<div class="my-6">
					<label for="phone" class="font-bold">Phone</label>
					<input
						type="number"
						name="phone"
						id="phone"
						bind:value={phone}
						required
						maxlength="15"
						class="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
					/>
				</div>

				<div class="my-6">
					<label for="email" class="font-bold">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						bind:value={email}
						required
						maxlength="20"
						class="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
					/>
				</div>

				<div class="my-6">
					<label for="pass" class="font-bold">Password</label>
					<input
						type="password"
						name="password"
						id="pass"
						bind:value={password}
						required
						maxlength="100"
						class="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
					/>
				</div>

				<button
					type="submit"
					class="my-6 block rounded-md bg-indigo-600 px-8 py-3 text-white shadow-sm hover:bg-indigo-700"
				>
					Register
					{#if requesting}
						<Spinner />
					{/if}
				</button>

				<p>
					Already Have An Account?
					<a href="/login" class="font-medium text-indigo-600">Login</a>
				</p>
			</form>
		</div>
	</div>
</section>
