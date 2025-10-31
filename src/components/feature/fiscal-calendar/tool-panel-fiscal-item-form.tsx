import React, {useCallback } from 'react';
import { FieldRoot, Input, FieldErrorText, Fieldset, FieldsetRoot, InputGroup, Box, SegmentGroupRoot, SegmentGroupItems, SegmentGroupIndicator } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { z, ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@chakra-ui/react/stack';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { currencyConverter } from '@/util/number-util';
import { useFiscalItemDraftProvider } from '@/app/budget-planner/provider/fiscal-item-draft-provider';
import { useLedgerProvider } from '@/app/budget-planner/provider/ledger-provider';
import { apiPOST, apiPATCH } from '@/service/api-service';
import toast from 'react-hot-toast';
import { setFormErrors } from '@/util/error-form-util';

export const newFiscalItemDtoSchema: ZodSchema = z.object({
	name: z.string( { invalid_type_error: "Not a valid name" }),
	amount: z.number( { invalid_type_error: "Not a valid amount" })
		.nonnegative("Must be a positive amount"),
	date: z.date( { invalid_type_error: "Not a valid date" }),
	expenditure: z.boolean( {
		coerce: false,
	 	invalid_type_error: "Invalid expenditure type",
	 	message: "Expenditure type is required"
	})
});

export interface FiscalItemDraftDto {
	id: string | null;
	name: string | null;
	description: string | null;
	amount: number;
	date: Date;
	expenditure: boolean;
	ledgerId: string | null;
}

export interface FiscalCreateDraftDto {
	name: string | null;
	description: string | null;
	amount: number;
	expenditure: boolean;
}

const getFirstDayOfMonth = (monthToCheck: Date): Date => {
	return new Date(monthToCheck.getFullYear(), monthToCheck.getMonth(), 1);
}

export type ExpenseOrIncome = "Expense" | "Income";

export default function ToolPanelFiscalItemForm(): React.ReactNode {
	const [ dateSelection, setDateSelection ] = React.useState<Date | null>(getFirstDayOfMonth(new Date()));
	const expenseOrIncomeOption: ExpenseOrIncome[] = ["Expense", "Income"];
	const { setFiscalItemInEdit, addNewFiscalItem, fiscalItemInEdit, updateFiscalItem } = useFiscalItemDraftProvider();
	const { ledger } = useLedgerProvider();
	const { control, register, reset, formState: { errors }, setError, getValues } = useForm<FiscalItemDraftDto>({
		defaultValues: {
			id: null,
			name: '',
			description: '',
			amount: 0,
			date: getFirstDayOfMonth(new Date()),
			expenditure: false,
			ledgerId: null
		},
		resolver: zodResolver(newFiscalItemDtoSchema),
		mode: 'onBlur',
	});
	const [lastSave, setLastSave] = React.useState<FiscalItemDraftDto | null>(null);

	const handleFormBlur = useCallback(() => {
		const values: FiscalItemDraftDto = getValues();
		const isNew: boolean = !values.id;
		const hasChanged: boolean = JSON.stringify(lastSave) !== JSON.stringify(values);
		if (isNew) {
			storeNewDraftItem(values);
			setLastSave(getValues());
		} else if (hasChanged) {
			storeUpdatedDraftItem(values);
			setLastSave(getValues());
		}
	}, [fiscalItemInEdit, getValues, updateFiscalItem, setFiscalItemInEdit, addNewFiscalItem]);

	const storeNewDraftItem = (values: FiscalItemDraftDto): void => {
		const itemToStore: FiscalCreateDraftDto = { ...values };
		apiPOST<FiscalCreateDraftDto, FiscalItemDraftDto>('/ledger/' + ledger?.id + '/fiscal-draft', itemToStore, false)
			.then(response => {
				if (response.status === 201 && response.data != null) {
					reset(
						response.data,
						{
							keepErrors: true,
						}
					);
					setFiscalItemInEdit(response.data);
					addNewFiscalItem(response.data);
					toast.success("Draft item created");
				} else if (response.errors?.length > 0) {
					setFormErrors(response.errors, setError);
					toast.error("Please fix the errors before saving changes");
				}
				else if (response.status === 400) {
					toast.error("Error creating draft item");
				}
			});
	}

	const storeUpdatedDraftItem = (values: FiscalItemDraftDto): void => {
		const itemToStore: FiscalItemDraftDto = { ...values };
		itemToStore.ledgerId = ledger?.id ?? null;

		apiPATCH<FiscalItemDraftDto, FiscalItemDraftDto>('/ledger/fiscal/fiscal-draft', itemToStore, false)
			.then((response) => {
				if (response.status === 200 && response.data != null) {
					reset(
						response.data,
						{
							keepErrors: true,
						}
					);
					updateFiscalItem(response.data);
				} else if (response.errors?.length > 0) {
					setFormErrors(response.errors, setError);
					toast.error("Please fix the errors before saving changes");
				} else {
					toast.error("Error updating changes on draft item");
				}
			});
	}

	const expenseValueToIsExpenditure = (value: string | null): boolean => value === "Expense";

	const isExpenditureToExpenseValue = (value: boolean): ExpenseOrIncome => value ? "Expense" : "Income";

	return (
		<form onBlur={handleFormBlur}>
			<FieldsetRoot>

				<Stack>

					<Fieldset.Legend>New payment</Fieldset.Legend>

					<Fieldset.HelperText>
						Set details for a new payment.
					</Fieldset.HelperText>
				</Stack>

				<FieldRoot invalid={!!errors.name}>

					<Input {...register("name")} placeholder={"Payment For"} />

					<FieldErrorText>{errors.name?.message}</FieldErrorText>
				</FieldRoot>

				<FieldRoot invalid={!!errors.description}>

					<Input
						{...register("description")}
						placeholder={"Description"}
					/>

					<FieldErrorText>{errors.description?.message}</FieldErrorText>
				</FieldRoot>

				<FieldRoot invalid={!!errors.amount}>

					<InputGroup startAddon="£" endAddon="GBP">

						<Input
							{
								...register(
									"amount",
									{ setValueAs: currencyConverter }
								)
							}
							step={"0.01"}
							placeholder={"0.00"}
							min={0}
							type={"number"}
						/>
					</InputGroup>

					<FieldErrorText>{errors.amount?.message}</FieldErrorText>
				</FieldRoot>

				<DatePicker
					className={"!p-2 !border-1 !border-gray-200 !outline-gray-400 !rounded-sm !text-sm"}
					isClearable={false}
					selected={dateSelection}
					adjustDateOnChange={true}
					onChange={setDateSelection}
					placeholderText={"Payment date"}
					dateFormat={"dd/MM/yyyy"}
				>

					<Box color={"gray.600"}>Payment date</Box>
				</DatePicker>

				<Controller
					control={control}
					name="expenditure"
					render={({ field }) => (
						<FieldRoot
							invalid={!!errors.expenditure}
						>

							<SegmentGroupRoot
								name={field.name}
								onBlur={field.onBlur}
								size={"lg"}
								value={isExpenditureToExpenseValue(field.value)}
								onValueChange={({value}) => field.onChange(expenseValueToIsExpenditure(value))}
							>

								<SegmentGroupIndicator />

								<SegmentGroupItems
									className={"cursor-pointer"}
									items={expenseOrIncomeOption}
								/>
							</SegmentGroupRoot>

							<FieldErrorText>{errors.expenditure?.message}</FieldErrorText>
						</FieldRoot>
					)}
				/>
			</FieldsetRoot>
		</form>
	)
}