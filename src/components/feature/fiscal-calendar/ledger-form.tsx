import React from 'react';
import { FieldErrorText, FieldRoot, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newFiscalItemDtoSchema } from '@/components/feature/fiscal-calendar/tool-panel-fiscal-item-form';
import { useAuthContext } from '@/global/authentication-provider';
import { z, ZodSchema } from 'zod';
import { apiPOST } from '@/service/api-service';
import toast from 'react-hot-toast';
import { Stack } from '@chakra-ui/react/stack';

export interface NewLedgerDto {
	name: string;
	createdBy: string;
	description: string | null;
	comment: string | null;
}

export const newLedgerItem: ZodSchema = z.strictObject({
	name: z.string( { invalid_type_error: "Not a valid name" })
		.nonempty("Name is required")
		.max(255, "Name is too long"),
	description: z.string( { invalid_type_error: "Not a valid description" } )
		.nullable(),
	comment: z.string( { invalid_type_error: "Not a valid comment" } )
		.nullable()
});

export default function LedgerCreateForm(): React.ReactNode {
	const { user } = useAuthContext();

	const { register, handleSubmit, formState: { errors } } = useForm<NewLedgerDto>({
		defaultValues: {
			name: "",
			description: null,
			comment: null
		},
		resolver: zodResolver(newFiscalItemDtoSchema),
		mode: 'onBlur'
	});

	const attemptCreateNewLedger = (data: NewLedgerDto): void => {
		if (!user) {
			toast.error("Please sign in first");
		} else {
			data.createdBy = user.id;
			apiPOST<NewLedgerDto, unknown>('/ledger', data)
				.then(res => {
					if (res.status === 201) {
						toast.success("Ledger created");
					} else {
						toast.error("Error creating ledger");
					}
				})
				.catch(() => {
					toast.error("Error creating ledger");
				});
		}
	}

	return (
		<Stack w={"full"} p={"4"} direction={"row"}>

			<form onSubmit={handleSubmit(attemptCreateNewLedger)}>

				<FieldRoot invalid={!!errors.name}>

					<Input {...register("name")} placeholder={"Ledger Name"} />

					<FieldErrorText>{errors.name?.message}</FieldErrorText>
				</FieldRoot>

				<FieldRoot invalid={!!errors.description}>

					<Input {...register("description")} placeholder={"Description"} />

					<FieldErrorText>{errors.description?.message}</FieldErrorText>
				</FieldRoot>

				<FieldRoot invalid={!!errors.comment}>

					<Input {...register("comment")} placeholder={"Comment"} />

					<FieldErrorText>{errors.comment?.message}</FieldErrorText>
				</FieldRoot>
			</form>
		</Stack>
	)
}