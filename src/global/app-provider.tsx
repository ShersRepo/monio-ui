"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "@/components/ui/color-mode"
import { AuthProvider } from '@/global/authentication-provider';
import { LoaderProvider } from '@/global/app-loading-provider';

export function AppProvider(props: ColorModeProviderProps): React.ReactNode {

	return (
		<ChakraProvider value={defaultSystem}>

			<AuthProvider>

				<LoaderProvider>

					<ColorModeProvider {...props} />
				</LoaderProvider>
			</AuthProvider>
		</ChakraProvider>
	)
}
