import {Box, HStack } from '@chakra-ui/react';
import FiscalCalendarToolPanel from '@/components/feature/fiscal-calendar/tool-panel';
import FiscalCalendar from '@/component/calendar/fiscal-calendar';
import React ,{ useEffect }from 'react';
import { useLedgerProvider } from '@/app/budget-planner/provider/ledger-provider';
import { apiGET } from '@/service/api-service';
import { LedgerModel } from '@/model/ledger.model';
import toast from 'react-hot-toast';
import { useAuthContext } from '@/global/authentication-provider';
import LedgerCreateForm from '@/components/feature/fiscal-calendar/ledger-form';

export default function FiscalPlannerView() {
	const { user } = useAuthContext();
	const [ hasLedgerData, setHasLedgerData ] = React.useState<boolean>(false);
	const { setLedger } = useLedgerProvider();

	useEffect(() => {
		if (user) {
			apiGET<LedgerModel>(`/ledger/${user.id}/with-fiscal-for-user`)
				.then(response => {
					if (response.status === 200) {
						if (response?.data === null) {
							toast.error("No ledger data found. Please create one");
							setHasLedgerData(false);
						} else {
							setLedger(response.data);
							setHasLedgerData(true);
						}
					} else if (response.status === 404) {
						setHasLedgerData(false);
					} else {
						toast.error("Error loading ledger data");
					}
				})
		}
	}, [user]);

	if (hasLedgerData) return (

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
	else return (

		<Box w={"full"} borderWidth={"1px"} borderColor={"gray.100"} borderRadius={"10px"} shadow={"sm"} p={"4"}>
			<LedgerCreateForm></LedgerCreateForm>
		</Box>
	)
}