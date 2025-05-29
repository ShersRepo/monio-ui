import React from 'react';
import { FieldRoot, Input, FieldErrorText, Fieldset, FieldsetRoot, InputGroup, Box, SegmentGroupRoot, SegmentGroupItems, SegmentGroupIndicator } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { z, ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@chakra-ui/react/stack';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { currencyConverter } from '@/util/number-util';

export const newFiscalItemDtoSchema: ZodSchema = z.object({
	name: z.string( { invalid_type_error: "Not a valid name" }),
	amount: z.number( { invalid_type_error: "Not a valid amount" })
		.nonnegative("Must be a positive amount"),
	date: z.date( { invalid_type_error: "Not a valid date" }),
	isExpenditure: z.boolean( {
		coerce: false,
	 	invalid_type_error: "Invalid expenditure type",
	 	message: "Expenditure type is required"
	})
});

export interface NewFiscalItemDto {
	name: string | null;
	description: string | null;
	amount: number;
	date: Date;
	isExpenditure: boolean;
}

const getFirstDayOfMonth = (monthToCheck: Date): Date => {
	return new Date(monthToCheck.getFullYear(), monthToCheck.getMonth(), 1);
}

export type CurrentFormAction = "new" | "editing" | "applying";

export type ExpenseOrIncome = "Expense" | "Income";

export default function ToolPanelFiscalItemForm(): React.ReactNode {
	const [ dateSelection, setDateSelection ] = React.useState<Date | null>(getFirstDayOfMonth(new Date()));
	const [ currentFormAction, setCurrentFormAction ] = React.useState<CurrentFormAction>("new");
	const expenseOrIncomeOption: ExpenseOrIncome[] = ["Expense", "Income"];

	const { control, register, handleSubmit, formState: { errors } } = useForm<NewFiscalItemDto>({
		defaultValues: {
			name: null,
			description: null,
			amount: 0.00,
			date: getFirstDayOfMonth(new Date()),
			isExpenditure: false
		},
		resolver: zodResolver(newFiscalItemDtoSchema),
		mode: 'onBlur'
	});

	const handleDateChange = (date: Date | null): void => {
		if (null === date) {
			setDateSelection(getFirstDayOfMonth(new Date()));
		} else {
			setDateSelection(date);
		}
	}

	const expenseValueToIsExpenditure = (value: string | null): boolean => value === "Expense";

	const isExpenditureToExpenseValue = (value: boolean): ExpenseOrIncome => value ? "Expense" : "Income";

	const patchForm = (): void => {
		console.log("patching form");
	}

	return (
		<FieldsetRoot>

			<Stack>

				<Fieldset.Legend>New payment</Fieldset.Legend>

				<Fieldset.HelperText>
					Set details for a new payment.
				</Fieldset.HelperText>
		   	</Stack>

			<FieldRoot invalid={!!errors.name}>

				<Input {...register("name")} placeholder={"Payment For"} onBlur={patchForm} />

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
		  		name="isExpenditure"
		  		render={({ field }) => (
					<FieldRoot
						invalid={!!errors.isExpenditure}
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

						<FieldErrorText>{errors.isExpenditure?.message}</FieldErrorText>
					</FieldRoot>
				)}
			/>
		</FieldsetRoot>
	)
}