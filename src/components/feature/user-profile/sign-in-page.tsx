import SignInForm from '@/components/feature/user-profile/sign-in-form';
import React from 'react';
import { useAuthContext } from '@/global/authentication-provider';

export default function SignInPage() {
	const { refreshAuthStatus } = useAuthContext();

	return (
		<div className={"flex flex-col items-center justify-center w-full"}>

			<SignInForm
				onSuccessfulLogin={refreshAuthStatus}
			/>
		</div>
	)
}