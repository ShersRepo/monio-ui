import { useForm } from 'react-hook-form';
import {authFormSchema, UserAuthenticationForm } from '@/component/page-layout/form/authentication-form-model';
import { zodResolver } from '@hookform/resolvers/zod';
import {Button, Text } from '@chakra-ui/react';
import SignUpButton from '@/components/feature/user-profile/sign-up-button';
import React from 'react';
import { authenticate } from '@/service/authentication-service';
import toast from 'react-hot-toast';
import { Stack } from '@chakra-ui/react/stack';
import { Input } from '@chakra-ui/react/input';

type SignInFormProps = Readonly<{
    onSuccessfulLogin: () => Promise<void>;
    titleElement?: React.ReactNode;
}>;

function DefaultTitle(): React.ReactNode {
	return (
		<Text fontSize="2xl">Please sign in</Text>
	)
}

export default function SignInForm({
		onSuccessfulLogin,
		titleElement = <DefaultTitle />
	}: SignInFormProps): React.ReactNode {

	const { register, handleSubmit } = useForm<UserAuthenticationForm>({
		defaultValues: {
			username: '',
			password: ''
		},
		resolver: zodResolver(authFormSchema),
		mode: 'onBlur'
	});

	async function attemptSignIn (user: Readonly<UserAuthenticationForm>): Promise<void> {
		authenticate(user.username, user.password)
			.then(res => {
				if (res.status === 204) {
					onSuccessfulLogin()
						.then(() => {
							toast.success("Signed in");
						}).catch(() => {
							toast.error("Failed to sign in");
						});
				} else {
					toast.error("Failed to sign in");
				}
			})
			.catch(() => toast.error("Failed to sign in. Please check your credentials and try again"));
	}

	return (
		<form onSubmit={handleSubmit(attemptSignIn)}>

			<Stack gap="4" align="center" maxW="sm">

				{titleElement}

				<Input
					placeholder="Username"
					size="md"
					{...register("username")}
				/>

				<Input
					placeholder="Password"
					size="md"
					type="password"
					{...register("password")}
				/>

				<Button size="sm" colorPalette="yellow" type={"submit"}>
					Sign in
				</Button>

				<Text my="4">
					Or if you have forgotten your credentials click here.
				</Text>

				<Button size="sm" colorPalette="cyan">
					Forgotten password
				</Button>

				<Text my="4">
					Or you can sign up here.
				</Text>

				<SignUpButton />
			</Stack>
		</form>
	)
}