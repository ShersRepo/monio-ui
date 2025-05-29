'use client';

import { Toaster } from 'react-hot-toast';
import FiscalCalendarToolPanel from '@/components/feature/fiscal-calendar/tool-panel';
import { Box } from '@chakra-ui/react';

export default function Home() {
	return (
		<>
			<Box w={"1/6"}>
				<FiscalCalendarToolPanel></FiscalCalendarToolPanel>
			</Box>
			<Toaster position="bottom-right" />
		</>
	);
}
