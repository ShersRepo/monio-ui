import React from 'react';
import ProfileToolbarOverview from '@/components/feature/user-profile/profile-toolbar-overview';
import {Box, Heading } from "@chakra-ui/react"

export default function AppHeader(): React.ReactNode {

	return (
		<Box h="16" px="6" bg="blue.900" color="gray.300" className={"flex items-center justify-between w-full"} >
			<Heading size="3xl" px="4">Monio</Heading>
			<div className={"w-full h-1 bg-yellow-300 rounded-md px-12"}></div>
			<ProfileToolbarOverview></ProfileToolbarOverview>
		</Box>
	)

}