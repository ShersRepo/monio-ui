'use client';

import React ,{ useEffect }from 'react';
import FiscalCalendar from '@/component/calendar/fiscal-calendar';
import { Box, HStack } from '@chakra-ui/react';
import FiscalCalendarToolPanel from '@/components/feature/fiscal-calendar/tool-panel';
import { apiGET } from '@/service/api-service';
import { useAuthContext } from '@/global/authentication-provider';
import { LedgerModel } from '@/model/ledger.model';
import toast from 'react-hot-toast';
import LedgerCreateForm from '@/components/feature/fiscal-calendar/ledger-form';

export default function BudgetPlanner(): React.ReactNode {
	const { user } = useAuthContext();
	const [ hasLedgerData, setHasLedgerData ] = React.useState<boolean>(false);

	useEffect(() => {
		if (user) {
			apiGET<LedgerModel>(`/ledger/${user.id}/with-fiscal-for-user`)
				.then(response => {
					if (response.status === 200 && response.data !== null) {
						setHasLedgerData(true);
						//display list
					} else if (response.status === 404) {
						setHasLedgerData(false);
						//Let user create first
					} else {
						toast.error("Error loading ledger data");
					}
				})
		}
	}, [user]);



	if (!user) {
		return <Box>Please sign in first</Box>
	} else if (!hasLedgerData) {
		return (
			<Box w={"full"} borderWidth={"1px"} borderColor={"gray.100"} borderRadius={"10px"} shadow={"sm"} p={"4"}>
				<LedgerCreateForm></LedgerCreateForm>
			</Box>
		)
	} else return (

		<Box borderWidth={"1px"} borderColor={"gray.100"} borderRadius={"10px"} shadow={"sm"} p={"4"}>

			<HStack>

				<Box
					bgColor={"yellow.50"}
					w={"25%"}
					borderRadius={"10px"}
					borderWidth={"1px"}
					p={"20px"}
					alignSelf={"start"}
					shadow={"lg"}
				>

					<FiscalCalendarToolPanel></FiscalCalendarToolPanel>
				</Box>

				<Box w={"75%"} px={"20px"}>

					<FiscalCalendar collapseToolbar={false}></FiscalCalendar>
				</Box>
			</HStack>
		</Box>
	)
}