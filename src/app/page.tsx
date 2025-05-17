'use client';

import AppHeader from '@/component/page-layout/header';
import { AuthProvider } from '@/global/authentication-provider';
import { Toaster } from 'react-hot-toast';

export default function Home() {
	return (
		<AuthProvider>
			<div>
				<AppHeader>
				</AppHeader>
			</div>
			<Toaster position="bottom-right" />
		</AuthProvider>
	);
}
