import { ApiResponse } from '@/service/model/api-response';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { APP_CONFIG } from '../../env.config';

const baseUrl = APP_CONFIG.api.baseUrl;

const API_FAIL_RESPONSE: ApiResponse<null> = {
	data: null,
	status: 500,
	message: "Something went wrong with our comms :(",
	errors: []
}

const requestConfig: AxiosRequestConfig<any> = {
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	},
}

/**
 *
 * @param {string} url endpoint
 * @param {P} data payload
 * @param {boolean} withErrorMessage whether to show api error
 * @returns {Promise<ApiResponse<T | null>>}
 */
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
		if (isAxiosError(error)) {
			const errorResponse = error as AxiosError<ApiResponse<T>>;
			return errorResponse?.response?.data ?? API_FAIL_RESPONSE;
		} else {
			return API_FAIL_RESPONSE;
		}
	}
}

export const apiPATCH = async <P, T> (url: string, data: P, withErrorMessage: boolean = true): Promise<ApiResponse<T | null>> => {
	try {
		const response: AxiosResponse<ApiResponse<T>> = await axios.patch<ApiResponse<T>>(
			baseUrl + url,
			JSON.stringify(data),
			{ ...requestConfig, method: 'PATCH' }
		);

		return response.data;
	} catch (error) {
		if (withErrorMessage) {
			toast.error(API_FAIL_RESPONSE.message);
		}
		if (isAxiosError(error)) {
			const errorResponse = error as AxiosError<ApiResponse<T>>;
			return errorResponse?.response?.data ?? API_FAIL_RESPONSE;
		} else {
			return API_FAIL_RESPONSE;
		}
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
		if (isAxiosError(error)) {
			const errorResponse = error as AxiosError<ApiResponse<T>>;
			return errorResponse?.response?.data ?? API_FAIL_RESPONSE;
		} else {
			return API_FAIL_RESPONSE;
		}
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