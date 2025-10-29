"use client"

import { LedgerModel } from '@/model/ledger.model';
import React,  { Context, createContext,useContext,useState } from 'react';

export interface LedgerContextProps {
	ledger: LedgerModel | null,
	setLedger: (ledger: LedgerModel | null) => void
}

const LedgerProviderContext: Context<LedgerContextProps | null> = createContext<LedgerContextProps | null>(null);

export function useLedgerProvider(): LedgerContextProps {
	const context: LedgerContextProps | null = useContext(LedgerProviderContext);

	if (!context) {
		throw new Error('useLedgerContext must be used within an LedgerProvider');
	}
	return context;
}

export function LedgerProvider({children}: Readonly<{children: React.ReactNode}>): React.ReactNode {
	const [ ledger, setLedger ] = useState<LedgerModel | null>(null);

	const contextValue: LedgerContextProps = {
		ledger: ledger,
		setLedger: setLedger
	}

	return (
		<LedgerProviderContext value={contextValue}>{children}</LedgerProviderContext>
	)
}
