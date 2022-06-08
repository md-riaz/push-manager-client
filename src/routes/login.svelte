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
	import { browserSet } from '$lib/utils';
	import { addToast } from '$lib/components/Toast/toastStore';

	let email = '',
		password = '',
		rememberme = false,
		requesting = false;

	const API_ENDPOINT = `${BASE_API_URI}/auth/login`;

	const handleLogin = async () => {
		try {
			requesting = true;
			const req = await fetch(API_ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password,
					rememberme
				})
			});

			if (!req.ok) {
				throw new Error(req.statusText);
			}

			const res = await req.json();

			if (res.error === 0) {
				browserSet('authToken', res.token);

				goto('/dashboard');
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
	<title>Login</title>
</svelte:head>

<section class="grid md:grid-cols-2">
	<a href="/" class="hidden bg-indigo-600 md:flex min-h-screen flex-col justify-center">
		<img src="./node-push.png" alt="" width="300" class="mx-auto" />
	</a>
	<div class="flex min-h-screen flex-col justify-center bg-white">
		<div class="mx-auto w-full max-w-[30rem] p-10">
			<form action="" method="post" on:submit|preventDefault={handleLogin}>
				<h4 class="mb-14 text-2xl font-bold capitalize">Login to your account</h4>

				<div class="my-6">
					<label for="email" class="font-bold">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						bind:value={email}
						required
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
						class="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
					/>
				</div>

				<div class="my-6 grid grid-cols-2">
					<label class="block">
						<input
							name="rememberme"
							type="checkbox"
							bind:checked={rememberme}
							class="mr-1 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
						/>
						Remember me
					</label>
					<a class="ml-auto font-medium text-indigo-600" href="/password_recovery"
						>Forgot Password?</a
					>
				</div>

				<button
					type="submit"
					class="my-6 block rounded-md bg-indigo-600 px-8 py-3 text-white shadow-sm hover:bg-indigo-700"
				>
					Login
					{#if requesting}
						<Spinner />
					{/if}
				</button>

				<p>
					Don't Have An Account? <a href="/registration" class="font-medium text-indigo-600"
						>Sign Up</a
					>
				</p>
			</form>
		</div>
	</div>
</section>
