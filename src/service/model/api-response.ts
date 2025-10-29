export interface ResponseFieldError {
	field: string;
	message: string;
}

export interface ApiResponse <T> {
	data: T;
	status: number;
	message: string;
	errors: ResponseFieldError[];
}