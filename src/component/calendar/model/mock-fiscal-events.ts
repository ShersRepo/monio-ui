import { FiscalItem } from '@/component/calendar/model/fiscal-item';

const today = new Date();

function getRandomBetween(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const mockFiscalEvents: FiscalItem[] = [
	// Salary and Income
	{
		id: crypto.randomUUID(),
		name: "Monthly Salary",
		description: "Software Developer position salary",
		amount: 5000.00,
		currency: "GBP",
		status: 'Active',
		expenditure: false,
		ledgerId: crypto.randomUUID(),
		dateOfPayment: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - getRandomBetween(-15, 15))
	},
	{
		id: crypto.randomUUID(),
		name: "Freelance Payment",
		description: "Web development project payment",
		amount: 1200.00,
		currency: "GBP",
		status: 'Draft',
		expenditure: false,
		ledgerId: crypto.randomUUID(),
		dateOfPayment: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - getRandomBetween(-15, 15))
	},

	// Utilities
	{
		id: crypto.randomUUID(),
		name: "Gas Bill",
		description: "Monthly natural gas utility payment",
		amount: 85.50,
		currency: "GBP",
		status: 'Draft',
		expenditure: true,
		ledgerId: crypto.randomUUID(),
		dateOfPayment: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - getRandomBetween(-15, 15))
	},
	{
		id: crypto.randomUUID(),
		name: "Electricity Bill",
		description: "Monthly electricity utility payment",
		amount: 120.75,
		currency: "GBP",
		status: 'Draft',
		expenditure: true,
		ledgerId: crypto.randomUUID(),
		dateOfPayment: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - getRandomBetween(-15, 15))
	},

	// Loans
	{
		id: crypto.randomUUID(),
		name: "Car Loan Payment",
		description: "Monthly car loan installment",
		amount: 450.00,
		currency: "GBP",
		status: 'Draft',
		expenditure: true,
		ledgerId: crypto.randomUUID(),
		dateOfPayment: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - getRandomBetween(-15, 15))
	},
	{
		id: crypto.randomUUID(),
		name: "Student Loan",
		description: "Student loan monthly payment",
		amount: 300.00,
		currency: "GBP",
		status: 'Draft',
		expenditure: true,
		ledgerId: crypto.randomUUID(),
		dateOfPayment: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - getRandomBetween(-15, 15))
	},

	// Bank Related
	{
		id: crypto.randomUUID(),
		name: "Credit Card Payment",
		description: "Monthly credit card bill",
		amount: 750.25,
		currency: "GBP",
		status: 'Active',
		expenditure: true,
		ledgerId: crypto.randomUUID(),
		dateOfPayment: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - getRandomBetween(-15, 15))
	},
	{
		id: crypto.randomUUID(),
		name: "Bank Account Interest",
		description: "Savings account monthly interest",
		amount: 15.50,
		currency: "GBP",
		status: 'Active',
		expenditure: false,
		ledgerId: crypto.randomUUID(),
		dateOfPayment: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - getRandomBetween(-15, 15))
	},

	// Regular Expenses
	{
		id: crypto.randomUUID(),
		name: "Internet Service",
		description: "Monthly internet subscription",
		amount: 79.99,
		currency: "GBP",
		status: 'Active',
		expenditure: true,
		ledgerId: crypto.randomUUID(),
		dateOfPayment: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - getRandomBetween(-15, 15))
	},
	{
		id: crypto.randomUUID(),
		name: "Phone Bill",
		description: "Mobile phone monthly plan",
		amount: 65.00,
		currency: "GBP",
		status: 'Active',
		expenditure: true,
		ledgerId: crypto.randomUUID(),
		dateOfPayment: new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - getRandomBetween(-15, 15))
	}
];