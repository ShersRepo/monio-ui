import { Box, Center,HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import {useEffect, useState } from 'react';

const DotDisplay = (): React.ReactNode => {
	const [ activeDot, setActiveDot ] = useState<number>(0);

	useEffect(() => {
		const incrementDotInIntervals = setInterval(() => {
			setActiveDot((prevDot) =>
				prevDot >= 2 ? 0 : prevDot + 1
			);
		}, 1000);

		return () => clearInterval(incrementDotInIntervals);
	}, []);

	return (
		<HStack >

			{[0, 1, 2].map((index) => (
				<Text
					key={index}
					color={index <= activeDot ? "teal.500" : "gray.400"}
					transition="color 0.2s ease"
					fontSize="2xl"
				>.</Text>
			))}
		</HStack>
	)
}

export default function AppSpinner(): React.ReactNode {

	return (
		<Box pos="absolute" inset="0" bg="bg/80">

			<Center h="full">

				<VStack>

					<Spinner
						color="teal.600"
						size="xl"
						animationDuration="1s"
						css={{ "--spinner-track-color": "colors.gray.200" }}
					>
					</Spinner>

					<HStack>

						<Text
							fontSize="2xl"
							color="teal.500"
						>
							Loading
						</Text>

						<DotDisplay />
					</HStack>
				</VStack>
			</Center>
		</Box>
	)
}