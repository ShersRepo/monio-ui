import { UUID } from 'node:crypto';

export interface UserAccount {
	id: UUID;
	email: string;
	userName: string;
	firstName: string;
	lastName: string;
}