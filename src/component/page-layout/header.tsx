import React from 'react';
import AppButton from '@/component/button';

export default function AppHeader(): React.ReactNode {

	return (
		<div className={ 'w-full h-32 bg-blue-950 flex items-center justify-between px-8' }>
			<span className={ 'text-gray-100 text-7xl' }>Monio</span>
			<AppButton>Sign in</AppButton>
		</div>
	)

}