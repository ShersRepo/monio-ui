import { constructFormLabelRegistry, EditableFormFields, FormLabelRegistry, LabelRegistry } from '@/component/form/registry/form-type-constructor';
import { z, ZodSchema } from 'zod';

export interface SignupFormDto {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
}

export const SignupFormLabels: LabelRegistry<SignupFormDto> = {
	username: 'Username',
	password: 'Password',
	firstName: 'First Name',
	lastName: 'Last Name',
	email: 'Email',
};

export const SignupFormRegister: FormLabelRegistry<SignupFormDto> = constructFormLabelRegistry(
	"Enter your account details",
	"User Authentication",
	SignupFormLabels,
);

export const SignupEditFormFields = EditableFormFields<typeof SignupFormLabels>()(
	["username", "password", 'firstName', 'lastName', 'email']
);

export const signupFormSchema: ZodSchema = z.object({
	username: z.string()
		.nonempty("Username is required")
		.min(3, 'Username must be at least 3 characters'),
	password: z.string()
		.nonempty("Password is required")
		.min(6, 'Password must be at least 6 characters'),
	firstName: z.string()
		.nonempty("First name is required"),
	lastName: z.string()
		.nonempty("Last name is required"),
	email: z.string()
		.nonempty("Email is required")
		.email("Not a valid email")
});

export type SignupFormSchema = z.infer<typeof signupFormSchema>;