import { ResponseFieldError } from '@/service/model/api-response';
import { Path, UseFormSetError } from 'react-hook-form';

export const setFormErrors = <T extends Object> (errors: ResponseFieldError[], errorSetter: UseFormSetError<T>): void => {
	for ( const err of errors ) {
		errorSetter(
			err.field as Path<T>,
			{
				type: 'server',
				message: err.message
			}
		);
	}
}