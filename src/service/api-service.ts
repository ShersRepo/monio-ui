import { ApiResponse } from '@/service/model/api-response';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

const baseUrl = 'http://localhost:8080/api';

const API_FAIL_RESPONSE: ApiResponse<null> = {
	data: null,
	status: 500,
	message: "Something went wrong with our comms :(",
	error: []
}

const requestConfig: AxiosRequestConfig<any> = {
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	},
}

export const apiPOST = async <P, T> (url: string, data: P, withErrorMessage: boolean = true): Promise<ApiResponse<T | null>> => {
	try {
		const response: AxiosResponse<ApiResponse<T>> = await axios.post<ApiResponse<T>>(
			baseUrl + url,
			JSON.stringify(data),
			{ ...requestConfig, method: 'POST' }
		);

		return response.data;
	} catch (error) {
		if (withErrorMessage) {
			toast.error(API_FAIL_RESPONSE.message);
		}
		return {...API_FAIL_RESPONSE, data: null} as ApiResponse<T>;
	}
}

export const apiGET = async <T> (url: string, withErrorMessage: boolean = true): Promise<ApiResponse<T | null>> => {
	try {
		const response: AxiosResponse<ApiResponse<T>> = await axios.get<ApiResponse<T>>(
			baseUrl + url,
			{ ...requestConfig, method: 'GET' }
		);

		return response.data;
	} catch (error) {
		if (withErrorMessage) {
			toast.error(API_FAIL_RESPONSE.message);
		}
		return {...API_FAIL_RESPONSE, data: null} as ApiResponse<T>;
	}
}

export const apiGETList = async <T> (url: string, withErrorMessage: boolean = true): Promise<ApiResponse<T[]>> => {
	try {
		const response: AxiosResponse<ApiResponse<T[]>> = await axios.get<ApiResponse<T[]>, any>(
			baseUrl + url,
			{ ...requestConfig, method: 'GET' }
		);

		return response.data;
	} catch (error) {
		if (withErrorMessage) {
			toast.error(API_FAIL_RESPONSE.message);
		}
		return {...API_FAIL_RESPONSE, data: []} as ApiResponse<T[]>;
	}
}