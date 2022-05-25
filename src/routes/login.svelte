<script>
	import { goto } from '$app/navigation';

	let email = '',
		password = '',
		rememberme = false;

	const API_ENDPOINT = 'http://localhost:3001/api/auth/login';

	const handleLogin = async () => {
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

		const res = await req.json();

		if (res.error === 0) {
			localStorage.setItem('authToken', res.token);
			goto('/dashboard');
		} else {
			alert(res.message);
		}
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<section class="grid md:grid-cols-2">
	<div class="hidden bg-indigo-600 md:block" />
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
