import { FiscalItemStatus } from '@/component/calendar/model/fiscal-item-status';

export interface FiscalItem {
	id: string;
	name: string;
	description: string;
	amount: number;
	currency: string;
	status: FiscalItemStatus;
	expenditure: boolean;
	dateOfPayment: Date;
	ledgerId: string;
}