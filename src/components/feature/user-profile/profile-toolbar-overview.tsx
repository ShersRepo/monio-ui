'use client';

import React ,{ useEffect }from 'react';
import { authenticate,logout } from '@/service/authentication-service';
import toast from 'react-hot-toast';
import { useAuthContext } from '@/global/authentication-provider';
import { UserAccount } from '@/service/model/user-account';
import { UserAuthenticationForm, authFormSchema } from '@/component/page-layout/form/authentication-form-model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Popover, Portal, Text } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react/input';
import { Stack } from '@chakra-ui/react/stack';
import SignUpButton from '@/components/feature/user-profile/sign-up-button';

const ProfileView = ({
	user,
	onSuccessfulLogout
}: Readonly<{
	user: UserAccount,
	onSuccessfulLogout: () => Promise<void>
}>): React.ReactNode => {

	const logoutUser = (): void => {
		logout()
		.then(res => {
			if (res.status === 204) {
				onSuccessfulLogout()
					.then(() => {
						toast.success("Logged out");
					}).catch(() => {
						toast.error("Something went wrong. Please refresh the page");
					});
			} else {
				toast.error("Something went wrong. Please refresh the page");
			}
		})
		.catch(() => toast.error("Something went wrong. Please refresh the page"));
	}

	return 	(
			<Popover.Root size="xs">

    			<Popover.Trigger asChild>

					<Button size="md" colorPalette="cyan">
						{user.firstName} {user?.lastName?.charAt(0)}.
					</Button>
    			</Popover.Trigger>

    			<Portal>

					<Popover.Positioner>

						<Popover.Content>

							<Popover.Arrow />

							<Popover.Body>

								<Button size="sm" colorPalette="cyan" onClick={logoutUser}>
									Logout
								</Button>
							</Popover.Body>
						</Popover.Content>
					</Popover.Positioner>
				</Portal>
			</Popover.Root>
	)
}

const SignInAccount = ({onSuccessfulLogin}: Readonly<{onSuccessfulLogin: () => Promise<void>}>): React.ReactNode => {
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
		<Popover.Root size="md">

			<Popover.Trigger asChild>

		  		<Button size="md" colorPalette="cyan">
					Sign In
			  	</Button>
			</Popover.Trigger>

			<Portal>

		  		<Popover.Positioner>

					<Popover.Content>

				  		<Popover.Arrow />

				  		<Popover.Body>

							<form onSubmit={handleSubmit(attemptSignIn)}>

								<Stack gap="4" align="center" maxW="sm">

									<Popover.Title fontWeight="medium">
										Enter your details to sign in
									</Popover.Title>

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
				  		</Popover.Body>
					</Popover.Content>
			  	</Popover.Positioner>
			</Portal>
	  	</Popover.Root>
	)
}

export default function ProfileToolbarOverview(): React.ReactNode {
	const { user, refreshAuthStatus } = useAuthContext();
	const [isAuthenticated, setIsAuthenticated] = React.useState(!!user);

	useEffect(() => {
		setIsAuthenticated(!!user);
	}, [user]);

	if (isAuthenticated && !!user) {

		return (
			<ProfileView user={user} onSuccessfulLogout={refreshAuthStatus} />
		)
	} else
		return (
			<SignInAccount onSuccessfulLogin={refreshAuthStatus} />
	)
}