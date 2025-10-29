import { FiscalItemModel } from '@/model/fiscal-item.model';

export interface LedgerModel {
	id: string;
	name: string;
	comment: string | null;
	defaultCurrency: string | null;
	notes: string[] | null;
	fiscalItems: FiscalItemModel[];
}