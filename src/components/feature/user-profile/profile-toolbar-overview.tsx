'use client';

import React ,{ useEffect }from 'react';
import { logout } from '@/service/authentication-service';
import toast from 'react-hot-toast';
import { useAuthContext } from '@/global/authentication-provider';
import { Button, Popover, Portal } from '@chakra-ui/react';
import SignInForm from '@/components/feature/user-profile/sign-in-form';
import { UserAccount } from '@/service/model/user-account';

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

const SignInTitle = (): React.ReactNode => {
	return (
		<Popover.Title fontWeight="medium">
			Enter your details to sign in
		</Popover.Title>
	)
}

const SignInAccount = ({onSuccessfulLogin}: Readonly<{onSuccessfulLogin: () => Promise<void>}>): React.ReactNode => {

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

							<SignInForm
								onSuccessfulLogin={onSuccessfulLogin}
								titleElement={<SignInTitle />}
							/>

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