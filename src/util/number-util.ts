const numberDecimalConverter = (value: string): number => {
	if (!value) {
		return 0;
	} else {
		return Number(parseFloat(value).toFixed(2));
	}
};

export const currencyConverter = (value: string): number => {
	if (!value) {
		return 0;
	} else {
		return Number(parseFloat(value).toFixed(2));
	}
};