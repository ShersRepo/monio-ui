import { UserAccount } from '@/service/model/user-account';
import React from 'react';
import { AvatarFallback, AvatarGroup, AvatarRoot } from '@chakra-ui/react';

export default function ProfileAvatar({
	user,
	avatarClickEvent
}: Readonly<{
	user: UserAccount,
	avatarClickEvent?: () => void
}>): React.ReactNode {

	return (
		<AvatarGroup>
			<AvatarRoot size={"lg"} onClick={avatarClickEvent}>
				<AvatarFallback name={user.firstName + " " + user.lastName}>
					{/*<AvatarImage></AvatarImage>*/}
				</AvatarFallback>
			</AvatarRoot>
		</AvatarGroup>
	)
}