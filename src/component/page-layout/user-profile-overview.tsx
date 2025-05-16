import React from 'react';

const profileView = (): React.ReactNode => {

	return (
		<button className={ 'h-32 w-56 bg-transparent text-white' }>View Account</button>
	)
}

const signedInView = (): React.ReactNode => {

	return (
		<button className={ 'h-32 w-56 bg-transparent text-white' }>View Account</button>
	)
}

export default function UserProfileOverview({isSignedIn}: Readonly<{isSignedIn: boolean}>): React.ReactNode {

	if (isSignedIn) {
		return signedInView();
	} else {
		return profileView();
	}

}