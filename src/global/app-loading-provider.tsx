"use client";

import { createContext,useContext,useState } from 'react';
import AppSpinner from '@/components/ui/app-spinner';

interface LoaderContextType {
	isLoading: boolean;
	showLoader: () => void;
	hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType>({
	isLoading: false,
	showLoader: () => {},
	hideLoader: () => {},
});

export function useLoader() {
	const context = useContext(LoaderContext);
	if (!context) {
		throw new Error('useLoader must be used within a LoaderProvider');
	}
	return context;
}

export function LoaderProvider({ children }: Readonly<{ children: React.ReactNode }>) {
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const showLoader = () => setIsLoading(true);
	const hideLoader = () => setIsLoading(false);

	return (
		<LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
			{ isLoading &&
				<AppSpinner />
			}
			{children}
		</LoaderContext.Provider>
	)
}