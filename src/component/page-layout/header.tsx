import React from 'react';
import UserProfileOverview from '@/component/page-layout/user-profile-overview';

export default function AppHeader(): React.ReactNode {

	return (
		<div className={ 'w-full h-32 bg-blue-950 flex items-center justify-between px-8' }>
			<span className={ 'text-gray-100 text-7xl' }>Monio</span>
			<UserProfileOverview></UserProfileOverview>
		</div>
	)

}