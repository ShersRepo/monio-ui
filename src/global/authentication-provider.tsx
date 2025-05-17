'use client';

import React,  { createContext,useContext } from 'react';
import { useAuth } from '@/service/authentication-service';

const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>): React.ReactNode {
	const auth = useAuth();

	return (
		<AuthContext.Provider value={auth}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuthContext must be used within an AuthProvider');
	}
	return context;
}
