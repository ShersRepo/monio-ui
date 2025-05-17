import React ,{ useEffect }from 'react';
import { authenticate } from '@/service/authentication-service';
import toast from 'react-hot-toast';
import { useAuthContext } from '@/global/authentication-provider';
import { UserAccount } from '@/service/model/user-account';
import {Avatar, Button, Menu,MenuItem, Modal, TextField, Typography } from '@mui/material';
import { ApiResponse } from '@/service/model/api-response';
import { UserAuthenticationFormLabels,UserAuthenticationForm,UserAuthenticationFormRegister,authFormSchema,UserAuthenticationEditFormFields } from '@/component/page-layout/form/authentication-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';
import LoginIcon from '@mui/icons-material/Login';
import { deepOrange } from '@mui/material/colors';

const ProfileView = ({
	user,
	logout,
}: Readonly<{
	user: UserAccount,
	logout: () => void
}>): React.ReactNode => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

	return 	<>
				<Button
					id={'user-account-menu'}
					aria-controls={open ? 'user-account-menu-options' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					className={"flex flex-col gap-x-2"}
					onClick={handleClick}
				>
					<Avatar sx={{ bgcolor: deepOrange[500] }}>
						{(user.firstName?.at(0) ?? '') + (user.lastName?.at(0) ?? '')}
					</Avatar>
				</Button>
				<Menu
					id="user-account-menu-options"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					aria-labelledby={'user-account-menu'}
				>
					<MenuItem onClick={handleClose}>Profile</MenuItem>
					<MenuItem onClick={handleClose}>My account</MenuItem>
					<MenuItem onClick={logout}>Logout</MenuItem>
				</Menu>
			</>
}

const tryAuth =  async (form: Readonly<UserAuthenticationForm>): Promise<ApiResponse<UserAccount | null>> => {
	return authenticate(form.username, form.password)
}

const SignInForm = ({onClose, onSuccessfulLogin}: Readonly<{ onClose: () => void, onSuccessfulLogin: () => Promise<void> }>): React.ReactNode => {
	const { register, handleSubmit, formState: { errors }, } = useForm<UserAuthenticationForm>({
		defaultValues: {
			username: '',
			password: ''
		},
		resolver: zodResolver(authFormSchema),
		mode: 'onBlur'
	});

	async function attemptSignIn (user: Readonly<UserAuthenticationForm>): Promise<void> {
		tryAuth(user)
			.then(res => {
				if (res.status === 204) {
					onSuccessfulLogin()
						.then(() => {
							toast.success("Signed in");
							onClose();
						}).catch(() => {
							toast.error("Failed to sign in");
						});
				} else {
					toast.error("Failed to sign in");
				}
			});
	}

	return (
		<div className={"w-1/4 h-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" +
		 " bg-white rounded-lg p-8 shadow-2xl flex flex-col justify-center items-center gap-x-4 overflow-y-scroll"}>
			<Typography id="modal-modal-title" variant="h6" component="h2">{UserAuthenticationFormRegister.formName}</Typography>
			<Typography id="modal-modal-description" sx={{ mt: 2 }}>
			</Typography>
			<form
				onSubmit={handleSubmit(attemptSignIn)}
				className={"flex flex-col gap-y-6"}
			>
				<TextField
					{...register(UserAuthenticationEditFormFields.username)}
					error={!!errors.username}
					helperText={errors.username?.message}
					id="username-field"
					label={UserAuthenticationFormLabels.username}
					type={"text"}
					variant="outlined"
				/>

				<TextField
					{...register(UserAuthenticationEditFormFields.password)}
					error={!!errors.password}
					helperText={errors.password?.message}
					id="password-field"
					label={UserAuthenticationFormLabels.password}
					type={"password"}
					variant="outlined"
				/>

				<Button
					type="submit"
					variant="contained"
					endIcon={<AccountCircleRounded />}
				>Sign In
				</Button>
			</form>

		</div>
	)
}

const SignInAccount = ({onSuccessfulLogin}: Readonly<{onSuccessfulLogin: () => Promise<void>}>): React.ReactNode => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<Button
				variant={"outlined"}
				onClick={ handleOpen }
				endIcon={<LoginIcon />}
			>Sign In</Button>
			<Modal
			  open={open}
			  onClose={handleClose}
			  aria-labelledby="modal-modal-title"
			  aria-describedby="modal-modal-description"
			>
				<SignInForm onClose={handleClose} onSuccessfulLogin={onSuccessfulLogin} />
			</Modal>
		</>
	)
}

export default function UserProfileOverview(): React.ReactNode {
	const { user, logout, refreshAuthStatus } = useAuthContext();
	const [isAuthenticated, setIsAuthenticated] = React.useState(!!user);

	useEffect(() => {
		setIsAuthenticated(!!user);
	}, [user]);

	if (isAuthenticated && !!user) {
		return <ProfileView user={user} logout={logout} />;
	} else {
		return <SignInAccount onSuccessfulLogin={refreshAuthStatus} />;
	}

}