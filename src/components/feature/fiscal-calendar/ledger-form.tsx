import React from 'react';
import { Button, FieldErrorText,FieldLabel, FieldRoot, FieldsetRoot, Input, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

export const newLedgerItemSchema: ZodSchema = z.strictObject({
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

	const { register, handleSubmit, formState: { errors, isDirty } } = useForm<NewLedgerDto>({
		defaultValues: {
			name: "",
			description: null,
			comment: null
		},
		resolver: zodResolver(newLedgerItemSchema),
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
		<form onSubmit={handleSubmit(attemptCreateNewLedger)}>

			<FieldsetRoot w={"full"} p={"4"} direction={"row"}>

				<FieldRoot invalid={!!errors.name} w={"500px"}>

					<FieldLabel>Ledger Name</FieldLabel>

					<Input {...register("name")} placeholder={"Enter your ledger name here"} />

					<FieldErrorText>{errors.name?.message}</FieldErrorText>
				</FieldRoot>


				<FieldRoot invalid={!!errors.description}>

					<FieldLabel>Description</FieldLabel>

					<Textarea {...register("description")} placeholder={"Here you can add a description"} />

					<FieldErrorText>{errors.description?.message}</FieldErrorText>
				</FieldRoot>

			</FieldsetRoot>

			<Stack w={"full"} p={"4"} direction={"row"}>

				<Button type={"submit"} colorPalette="yellow" disabled={!isDirty}>Start Ledger</Button>
			</Stack>
		</form>
	)
}