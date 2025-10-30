import { Button } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpButton(): React.ReactNode {
	const router = useRouter();

	const navigateToSignUp = () => {
		router.push('/sign-up');
	}

	return (
		<Button size="sm" colorPalette="cyan" onClick={navigateToSignUp}>
			Sign up
		</Button>
	)
}