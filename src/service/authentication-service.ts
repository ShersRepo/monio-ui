import { ApiResponse } from '@/service/model/api-response';
import { UserAccount } from '@/service/model/user-account';
import { useEffect, useState } from 'react';
import { apiGET, apiPOST } from '@/service/api-service';
import toast from 'react-hot-toast';

interface AuthenticateRequest {
	username: string,
	password: string
}

export async function authenticate(username: string, password: string): Promise<ApiResponse<UserAccount | null>> {
	return await apiPOST<AuthenticateRequest, UserAccount | null>(
		"/auth",
		{
			username: username,
			password: password
		},
		false
	)
}

export interface AuthServiceState {
	user: UserAccount | null,
	loading: boolean,
	pageLoading: boolean,
	error: string | null,
	refreshAuthStatus: () => Promise<void>,
	logout: () => Promise<void>
}

export function useAuth(): AuthServiceState {
	const [ user, setUser ] = useState<UserAccount | null>( null );
	const [ loading, setLoading ] = useState<boolean>( true );
	const [ pageLoading, setPageLoading ] = useState<boolean>( true );
	const [ error, setError ] = useState<string | null>( null );

	const refreshAuthStatus = async () => {
		apiGET<UserAccount>("/auth/status", false).then(response => {
			if (response.status === 200) {
				setUser( response.data );
			} else {
				setUser(null);
			}
		}).catch(() => {
			setUser( null )
		});
	};

	useEffect(() => {
		refreshAuthStatus();
	}, [])

	const logout = async () => {
		try {
			apiPOST<{}, null>( '/auth/logout', {}, false )
				.then(response => {
					if (response.status === 204) {
						toast.success("Logged out");
					}
				});
				setUser(null);
		} catch (error) {
			setUser(null);
			setError('Logged out');
		}
	}

	return {
		user,
		loading,
		pageLoading,
		error,
		refreshAuthStatus,
		logout
	};
}

