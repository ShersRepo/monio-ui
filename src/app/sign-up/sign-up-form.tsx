"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SignupFormDto, signupFormSchema } from '@/app/sign-up/sign-up-form-model';
import { useForm } from 'react-hook-form';
import { apiPOST } from '@/service/api-service';
import toast from 'react-hot-toast';
import { Field } from '@chakra-ui/react/field';
import { Input } from '@chakra-ui/react/input';
import { Stack } from '@chakra-ui/react/stack';
import { Flex } from '@chakra-ui/react/flex';
import { Button,Text } from '@chakra-ui/react';

export default function SignupForm(): React.ReactNode {

	const { register, handleSubmit, formState: { errors } } = useForm<SignupFormDto>({
		defaultValues: {
			username: '',
			password: '',
			firstName: '',
			lastName: '',
			email: ''
		},
		resolver: zodResolver(signupFormSchema),
		mode: 'onBlur'
	});

	const onFormSubmit = handleSubmit((form: SignupFormDto): void => {
		apiPOST<SignupFormDto, null>("/user", form)
			.then(response => {
				if (response.status === 204) {
					toast.success("Signed in");
				} else {
					toast.error("Account creation failed");
				}
			});
	});

	return (
		<form
			onSubmit={onFormSubmit}
			className={"flex flex-col gap-y-12 w-full items-center"}
		>

			<Text>Enter some details to get started...</Text>

			<Flex gap="40">

				<Stack gap="4" align="center" maxW="sm">

					<Field.Root invalid={!!errors.username}>

						<Field.Label>Username</Field.Label>

						<Input {...register("username")} />

						<Field.ErrorText>{errors.username?.message}</Field.ErrorText>
					</Field.Root>

					<Field.Root invalid={!!errors.email}>

						<Field.Label>Email</Field.Label>

						<Input {...register("email")} type="email" />

						<Field.ErrorText>{errors.email?.message}</Field.ErrorText>
					</Field.Root>

					<Field.Root invalid={!!errors.password}>

						<Field.Label>Password</Field.Label>

						<Input {...register("password")} type="password" />

						<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
					</Field.Root>
				</Stack>

				<Stack gap="4" align="center" maxW="sm">

					<Text color="gray.400">Optionally..</Text>

					<Field.Root invalid={!!errors.firstName}>

						<Field.Label>First name</Field.Label>

						<Input {...register("firstName")} />

						<Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
					</Field.Root>

					<Field.Root invalid={!!errors.lastName}>

						<Field.Label>Last name</Field.Label>

						<Input {...register("lastName")} />

						<Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
					</Field.Root>
				</Stack>
			</Flex>

			<Button type={"submit"} colorPalette="yellow">Create Account</Button>
		</form>
	)

}
