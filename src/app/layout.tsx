import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppHeader from '@/component/page-layout/header';
import { AppProvider } from "@/global/app-provider"
import { Box } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Monio",
	description: "Budget planning with Monio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang="en" suppressHydrationWarning>

			<body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full w-full`}>

				<AppProvider>

					<AppHeader />

					<Box p="10">
						{children}
					</Box>

					<Toaster position="bottom-right" />
				</AppProvider>
			</body>
    	</html>
	);
}
