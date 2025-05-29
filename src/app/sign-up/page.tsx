import ScreenTemplate from '@/component/page-layout/screen-template';
import SignupForm from '@/app/sign-up/sign-up-form';

export default function SignupPage() {

	return (
		<ScreenTemplate>
			<div className={"flex flex-row"}>
				<SignupForm></SignupForm>
			</div>
		</ScreenTemplate>
	)
}