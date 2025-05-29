import { constructFormLabelRegistry, EditableFormFields, FormLabelRegistry, LabelRegistry } from '@/component/form/registry/form-type-constructor';
import { z, ZodSchema } from 'zod';

export interface UserAuthenticationForm {
	username: string;
	password: string;
}

export const UserAuthenticationFormLabels: LabelRegistry<UserAuthenticationForm> = {
	username: 'Username',
	password: 'Password'
};

export const UserAuthenticationFormRegister: FormLabelRegistry<UserAuthenticationForm> = constructFormLabelRegistry(
	"Enter your account details",
	"User Authentication",
	UserAuthenticationFormLabels,
);

export const UserAuthenticationEditFormFields = EditableFormFields<typeof UserAuthenticationFormLabels>()(
	["username", "password"]
);

export const authFormSchema: ZodSchema = z.object({
										   username: z.string()
														.nonempty("Username is required")
												  		.min(3, 'Username must be at least 3 characters'),
										   password: z.string()
													  .nonempty("Password is required")
													  .min(6, 'Password must be at least 6 characters')
									   });

export type AuthFormSchema = z.infer<typeof authFormSchema>;