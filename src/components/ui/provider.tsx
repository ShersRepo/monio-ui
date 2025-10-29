"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { AuthProvider } from '@/global/authentication-provider';

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>

		<AuthProvider>

	  		<ColorModeProvider {...props} />
		</AuthProvider>
    </ChakraProvider>
  )
}
