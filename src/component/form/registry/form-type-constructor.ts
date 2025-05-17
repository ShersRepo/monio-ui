export type LabelRegistry<T> = Record<keyof T, string>;

export type FormLabelRegistry<T> = LabelRegistry<T> & {
	formId: string;
	formName: string;
};

export const constructFormLabelRegistry = <T>(
	formName: string,
	formId: string,
	labelRegistry: LabelRegistry<T>
): FormLabelRegistry<T> => {
	return {
		...labelRegistry,
		formId: formId,
		formName: formName,
	}
}

export function EditableFormFields<T>(): <K extends keyof T> (fields: K[]) => Record<K, K> {
	return <K extends keyof T>(fields: K[]): Record<K, K> =>
		Object.fromEntries(fields.map((key: K): [K, K] => [key, key])) as Record<K, K>;
}

export const constructFieldId = <T>(formRegistry: FormLabelRegistry<T>, fieldName: keyof T): string => {
	const formId = formRegistry.formId.replaceAll(" ", "-");
	const formName = formRegistry.formName.replaceAll(" ", "-");
	const fieldNameDisplay = String(fieldName).replaceAll(" ", "-");

	return `${formId}-${formName}-${fieldNameDisplay}`.trim().toLowerCase();
}