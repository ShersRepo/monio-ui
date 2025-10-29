'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { useAuthContext } from '@/global/authentication-provider';
import { FiscalDraftProvider } from '@/app/budget-planner/provider/fiscal-item-draft-provider';
import { LedgerProvider } from '@/app/budget-planner/provider/ledger-provider';
import FiscalPlannerView from '@/app/budget-planner/fiscal-planner-view';

export default function BudgetPlanner(): React.ReactNode {
	const { user } = useAuthContext();

	if (user) return (

		<LedgerProvider>

			<FiscalDraftProvider>

				<FiscalPlannerView />
			</FiscalDraftProvider>
		</LedgerProvider>
	)
	else return (

		<Box>Please sign in first</Box>
	)
}