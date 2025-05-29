import { FiscalItemModel } from '@/model/fiscal-item.model';

export interface LedgerModel {
	id: string;
	name?: string;
	comment?: string;
	notes: string[];
	fiscalItems: FiscalItemModel[];
}