"use client"

import { createContext, useContext, useState } from 'react';
import { FiscalItemDraftDto } from '@/components/feature/fiscal-calendar/tool-panel-fiscal-item-form';

export interface FiscalItemDraftContextProps {
	fiscalItems: FiscalItemDraftDto[];
	addNewFiscalItem: (item: FiscalItemDraftDto) => void;
	fiscalItemInEdit: FiscalItemDraftDto | null;
	setFiscalItemInEdit: (item: FiscalItemDraftDto | null) => void;
	updateFiscalItem: (updatedItem: FiscalItemDraftDto) => void;
}

const FiscalItemDraftProvider = createContext<FiscalItemDraftContextProps | null>(null);

export function useFiscalItemDraftProvider() {
	const context = useContext(FiscalItemDraftProvider);
	if (!context) {
		throw new Error('useAuthContext must be used within an AuthProvider');
	}
	return context;
}

export function FiscalDraftProvider({children}: Readonly<{children: React.ReactNode}>): React.ReactNode {
	const [ itemInEdit, setItemInEdit ] = useState<FiscalItemDraftDto | null>(null);
	const [ allItems, setAllItems ] = useState<FiscalItemDraftDto[]>([]);

	const addNewItem = (item: FiscalItemDraftDto) => {
    	const updatedList = [...allItems, item];
		setAllItems(updatedList);
	}

	const setFiscalItemInEdit = (item: FiscalItemDraftDto | null) => setItemInEdit(item);

	const updateFiscalItem = (updatedItem: FiscalItemDraftDto) => {
        setAllItems(prevItems =>
            prevItems.map(item =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
    };

	const contextValue: FiscalItemDraftContextProps = {
		fiscalItems: allItems,
		addNewFiscalItem: addNewItem,
		fiscalItemInEdit: itemInEdit,
		setFiscalItemInEdit: setFiscalItemInEdit,
		updateFiscalItem: updateFiscalItem
	}

	return (
		<FiscalItemDraftProvider.Provider value={contextValue}>{children}</FiscalItemDraftProvider.Provider>
	)
}